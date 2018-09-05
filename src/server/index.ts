import express from "express";
import prepare from "./prepare";
import * as path from "path";
import uuid from "uuid/v1";
import * as CT from "./common-types";
import { mkImpressionEventExpressRequest } from "./analytics/events/impression";
import { callv1 } from "./analytics/packman-caller";
import {decrypt} from './campaigns/campaigid'

const app = express();

app.get("/:encCampaignId", (req: express.Request, res: express.Response) => {
  const rockmanId = CT.RockmanId.wrap(uuid().replace(/-/g, ''));
  const campaignId = decrypt(req.params.encCampaignId)
  console.log(campaignId)
  const event = mkImpressionEventExpressRequest(
    rockmanId,
    CT.userIdFromRockmanId(rockmanId),
    1,
    1,
    {
      offerId: CT.OfferId.wrap(1),
      affiliateId: CT.AffiliateId.wrap("HOMAM")
    },
    CT.Country.wrap("KE"),
    CT.HandleName.wrap("HOMAM-HANDLE"),
    CT.AdName.wrap("HOMAM-ADNAME"),
    CT.SubMethod.wrap("Tola"),
    req
  );
  callv1(event)
  prepare(rockmanId).pipe(res);
});

app.use(
  '/static',
  express.static(path.join(__dirname, "/../../dist/static")) //, { maxAge: 31557600000 })
);

app.listen(3030);
