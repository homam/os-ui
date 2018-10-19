import express from "express";
import prepare from "./prepare";
import uuid from "uuid/v1";
import R from 'ramda';
import * as CT from "./common-types";
import { decrypt } from "./campaigns/campaignId";
import campaigns, { invalidCampaign, testCampaign} from "./campaigns/map";
import { addImpression, mkPool, run_, run, addEvent } from "./analytics/db";
import { CampaignValue } from "./campaigns/types";
import bodyParser from "body-parser";
import { left } from "fp-ts/lib/Either";
import { Option, some } from "fp-ts/lib/Option";
import * as request from 'request-promise-native'
import cookieParser from 'cookie-parser'

const app = express();
const pool = mkPool(process.env.osui_connection_string);

app.use('/favicon.ico', express.static('assets/favicon.ico'));
app.get('/robots.txt', (_, res) => res.end('User-agent: *\nDisallow: /'))

app.post(
  "/analytics/impression/:encCampaignId",
  bodyParser.json({ type: _ => true }),
  async (req: express.Request, res: express.Response) => {
    const { rockmanId, userId, page, originalUrl } = req.body;
    const campaignId = decrypt(req.params.encCampaignId);
    run_(pool, client =>
      addImpression(
        client,
        "Client",
        rockmanId,
        userId,
        campaignId,
        CT.HandleName.wrap(page),
        CT.Url.wrap(originalUrl),
        CT.IP.wrap(req.ip),
        CT.Country.wrap("xx"),
        req.headers
      )
    );
    res.end();
  }
);

app.post(
  "/analytics/event",
  bodyParser.json({ type: _ => true }),
  (req: express.Request, res: express.Response) => {
    const {
      rockmanId,
      category,
      action,
      label,
      value,
      args,
      relt,
      view
    } = req.body;
    run_(pool, client =>
      addEvent(
        client,
        left(CT.RockmanId.wrap(rockmanId)),
        view,
        category,
        action,
        label,
        value,
        args,
        relt
      )
    );

    res.send();
  }
);

async function serveCampaign(
  campaign: Option<CampaignValue>,
  skipCache: boolean,
  req: express.Request,
  res: express.Response
) {
  const rockmanId = CT.RockmanId.wrap(uuid().replace(/-/g, ""));
  const userId = CT.userIdFromRockmanId(req.cookies.userId || rockmanId);
  const impressionNumber = CT.ImpressionNumber.wrap(1);

  const recordImpressionEvent = async (cmp: CampaignValue) => {
    run_(pool, client =>
      addImpression(
        client,
        "Server",
        rockmanId,
        userId,
        cmp.id,
        cmp.page,
        CT.Url.wrap(req.originalUrl),
        CT.IP.wrap(req.headers['x-forwarded-for'] as string || req.ip),
        CT.Country.wrap("xx"),
        R.omit(['connection', 'accept', 'accept-encoding', 'upgrade-insecure-requests'], req.headers)
      )
    );

    const theCampaign = campaign.fold(invalidCampaign, x => x)
    request.default({
      method: 'POST',
      json: true,
      body: {
        rockmanId: CT.RockmanId.unwrap(rockmanId),
        pacmanId: `${CT.RockmanId.unwrap(rockmanId)}-1-${CT.ImpressionNumber.unwrap(impressionNumber)}}`,
        impressionId: CT.ImpressionNumber.unwrap(impressionNumber),
        landingPageUrl: 'http://' + req.hostname + req.originalUrl, 
        handleName: CT.HandleName.unwrap(theCampaign.page),
        pageName: 'default',
        serverTime: new Date().valueOf(),
        eventType: "impression",
        headers: req.headers,
        country: CT.Country.unwrap(theCampaign.country),
        offerId: CT.OfferId.unwrap(theCampaign.affiliateInfo.offerId),
        affId: CT.AffiliateId.unwrap(theCampaign.affiliateInfo.affiliateId),
        remoteAddress: req.headers['x-forwarded-for'] as string || req.ip,
      },
      uri: 'https://de-pacman.sam-media.com/api/v1/store'
    })
  }

  campaign.fold(
    () => {
      recordImpressionEvent(invalidCampaign);
      res.status(404);
      res.end("Campaign is not valid");
    },
    campaign => async () => {
      recordImpressionEvent(campaign);
      res.cookie('userId', CT.UserId.unwrap(userId), {expires: new Date(new Date().valueOf() + 90*24*3600*1000)})
      try {
        const stream = await prepare(rockmanId, impressionNumber, campaign, skipCache);
        stream.pipe(res);
      } catch (ex) {
        res.status(500);
        res.send({ error: ex.toString() });
      }
    }
  )();
}

app.get('/preview', cookieParser(), async (req, res) => {
  try {
    serveCampaign(some(testCampaign(req.query.page, req.query.country)), true, req, res)
  } catch(ex) {
    console.error(ex)
    res.status(500);
    res.end(ex.toString())
  }
});

app.get(
  "/:encCampaignId",
  cookieParser(),
  async (req: express.Request, res: express.Response) => {
    const campaignId = decrypt(req.params.encCampaignId);
    const campaign = await run(pool, client => campaigns(client, campaignId));

    return serveCampaign(campaign, false, req, res);
  }
);

app.use(
  "/static",
  express.static("../client/dist/static") //, { maxAge: 31557600000 })
);

/*(() => {
  // add express static file handler for each directory in dist/
  const isDirectory = source => fs.lstatSync(source).isDirectory();
  const getDirectories = source =>
    fs
      .readdirSync(source)
      .map(name => path.join(source, name))
      .filter(isDirectory);

  getDirectories(path.join(__dirname, "/../../dist")).map(d => {
    app.use(
      "/" + path.basename(d),
      express.static(d) //, { maxAge: 31557600000 })
    );
  });
})();*/

const port = !!process.env.port ? parseInt(process.env.port) : 3030;
app.listen(port);
console.log("Listening on " + port);
