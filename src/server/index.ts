import express from "express";
import prepare from "./prepare";
import * as path from "path";
import * as fs from "fs";
import uuid from "uuid/v1";
import * as CT from "./common-types";
import { callv1 } from "../pacman/server/packman-caller";
import { decrypt } from "./campaigns/campaigid";
import * as campaigns from "./campaigns/map";

const app = express();

app.get("/:encCampaignId", (req: express.Request, res: express.Response) => {
  const rockmanId = CT.RockmanId.wrap(uuid().replace(/-/g, ""));
  const campaignId = decrypt(req.params.encCampaignId);
  const campaign = campaigns.find(campaignId);

  const recordImpressionEvent = ({ page, country, affiliateInfo }) => {
    
  };

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
  express.static('dist/static') //, { maxAge: 31557600000 })
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

const port = !!process.env.port ? parseInt(process.env.port) : 3030
app.listen(port);
console.log("Listening on " + port)
