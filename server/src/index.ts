import express from "express";
import prepare from "./prepare";
import uuid from "uuid/v1";
import * as CT from "./common-types";
import { decrypt } from "./campaigns/campaigid";
import campaigns, { invalidCampaign, testCampaign} from "./campaigns/map";
import { addImpression, mkPool, run_, run, addEvent } from "./analytics/db";
import { CampaignValue } from "./campaigns/types";
import bodyParser from "body-parser";
import { left } from "fp-ts/lib/Either";
import { Option, some } from "fp-ts/lib/Option";

const app = express();
const pool = mkPool(process.env.osui_connection_string);

app.post(
  "/analytics/impression/:encCampaignId",
  bodyParser.json({ type: _ => true }),
  (req: express.Request, res: express.Response) => {
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
  req: express.Request,
  res: express.Response
) {
  const rockmanId = CT.RockmanId.wrap(uuid().replace(/-/g, ""));
  const userId = CT.userIdFromRockmanId(rockmanId);

  const recordImpressionEvent = async (cmp: CampaignValue) =>
    run_(pool, client =>
      addImpression(
        client,
        "Server",
        rockmanId,
        userId,
        cmp.id,
        cmp.page,
        CT.Url.wrap(req.originalUrl),
        CT.IP.wrap(req.ip),
        CT.Country.wrap("xx"),
        req.headers
      )
    );

  campaign.fold(
    () => {
      recordImpressionEvent(invalidCampaign);
      res.status(404);
      res.end("Campaign is not valid");
    },
    campaign => async () => {
      recordImpressionEvent(campaign);
      try {
        const stream = await prepare(rockmanId, campaign);
        stream.pipe(res);
      } catch (ex) {
        res.status(500);
        res.send({ error: ex.toString() });
      }
    }
  )();
}

app.get('/preview', (req, res) => serveCampaign(some(testCampaign(req.query.page, req.query.country)), req, res))

app.get(
  "/:encCampaignId",
  async (req: express.Request, res: express.Response) => {
    const campaignId = decrypt(req.params.encCampaignId);
    const campaign = await run(pool, client => campaigns(client, campaignId));

    return serveCampaign(campaign, req, res);
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
