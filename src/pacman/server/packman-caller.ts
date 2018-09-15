import request from "request";
import express from "express";
import * as CT from "../../server/common-types";
import {mkImpressionEventExpressRequest} from "../events/impression"

export function callv1(event: any) {
  var options = {
    uri: "https://de-pacman.sam-media.com/api/v1/store",
    method: "POST",
    json: event
  };

  request(options, function(error, response, body) {
    if (!!error && response.statusCode != 200) {
      console.error("Error in recording v1 event:", error, body)
    } else {
      // thank you!
    }
  });
}

export function recordImpressionEvent(req: express.Request, rockmanId : CT.NTRockmanId, { page, country, affiliateInfo } : {page:CT.NTHandleName, country: CT.NTCountry, affiliateInfo: CT.AffiliateInfo}) {
  const event = mkImpressionEventExpressRequest(
    rockmanId,
    CT.userIdFromRockmanId(rockmanId),
    1,
    1,
    affiliateInfo,
    country,
    page,
    CT.AdName.wrap("HOMAM-ADNAME"),
    CT.SubMethod.wrap("Tola"),
    req
  );
  callv1(event);
};