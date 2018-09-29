import express from "express";
import prepare from "./prepare";
import uuid from "uuid/v1";
import * as CT from "./common-types";
import { decrypt } from "./campaigns/campaigid";
import * as campaigns from "./campaigns/map";
import { addImpression, mkPool, run_, addEvent } from "./analytics/db";
import { CampaignValue } from "./campaigns/types";
import bodyParser from "body-parser";
import { left } from "fp-ts/lib/Either";

const app = express();
const pool = mkPool("postgresql://localhost/os-ui");

app.post(
  "/analytics/impression/:encCampaignId",
  bodyParser.json({type: _ => true}),
  (req: express.Request, res: express.Response) => {
    const {rockmanId, userId, page, originalUrl} = req.body
    const campaignId = decrypt(req.params.encCampaignId);
    run_(pool, client =>
      addImpression(
        client,
        'Client',
        rockmanId,
        userId,
        campaignId,
        CT.HandleName.wrap(page),
        CT.Url.wrap(originalUrl),
        CT.IP.wrap(req.ip),
        CT.Country.wrap("xx"),
        req.headers
      )
    )
    res.end()
  }
);

app.post(
  "/analytics/event",
  bodyParser.json({type: _ => true}),
  (req: express.Request, res: express.Response) => {
    const { rockmanId, category, action, label, value, args, relt, view } = req.body;
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

app.get("/:encCampaignId", (req: express.Request, res: express.Response) => {
  const rockmanId = CT.RockmanId.wrap(uuid().replace(/-/g, ""));
  const userId = CT.userIdFromRockmanId(rockmanId);
  const campaignId = decrypt(req.params.encCampaignId);
  const campaign = campaigns.find(campaignId);

  const recordImpressionEvent = async (cmp: CampaignValue) =>
    run_(pool, client =>
      addImpression(
        client,
        'Server',
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
      recordImpressionEvent(campaigns.invalidCampaign);
      res.status(404);
      res.end("Campaign is not valid");
    },
    campaign => () => {
      recordImpressionEvent(campaign);
      prepare(rockmanId, campaign).pipe(res);
    }
  )();
}); 

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
