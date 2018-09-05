import * as express from "express";
import * as CT from '../../common-types'

type ProcessIPResult = {
  ip: string;
  ip2: string;
  ip3: string;
};

function processIPAddress(ip: CT.NTIP): ProcessIPResult {
  const ipStr = CT.IP.unwrap(ip);
  const match = /(\d+)\.(\d+)\.(\d+)\.(\d+)/.exec(ipStr);
  if (!!match) {
    const [_, i1, i2, i3, i4] = match;
    return {
      ip: ipStr,
      ip2: `${i1}.${i2}`,
      ip3: `${i1}.${i2}.${i3}`
    };
  } else {
    return {
      ip: null,
      ip2: null,
      ip3: null
    };
  }
}

export function mkImpressionEventExpressRequest(
  rockmanId: CT.NTRockmanId,
  userId: CT.NTUserId,
  session: number,
  impression: number,
  affiliateInfo: CT.AffiliateInfo,
  country: CT.NTCountry,
  handleName: CT.NTHandleName,
  adName: CT.NTAdName,
  subMethod: CT.NTSubMethod,
  req: express.Request
) {
  return mkImpressionEvent(
    rockmanId,
    userId,
    session,
    impression,
    affiliateInfo,
    country,
    handleName,
    adName,
    subMethod,
    CT.Url.wrap(req.url),
    req.query,
    req.headers,
    CT.IP.wrap(req.ip)
  );
}

export function mkImpressionEvent(
  rockmanId: CT.NTRockmanId,
  userId: CT.NTUserId,
  session: number,
  impression: number,
  affiliateInfo: CT.AffiliateInfo,
  country: CT.NTCountry,
  handleName: CT.NTHandleName,
  adName: CT.NTAdName,
  subMethod: CT.NTSubMethod,
  landingPageUrl: CT.NTUrl,
  queryTokens: { [header: string]: string | string[] | undefined },
  headers: { [header: string]: string | string[] | undefined },
  remoteAddress: CT.NTIP
) {
  const now = new Date();
  const handleNameStr = CT.HandleName.unwrap(handleName);
  const adNameStr = CT.AdName.unwrap(adName);
  const userIdStr = CT.UserId.unwrap(userId);
  const { ip, ip2, ip3 } = processIPAddress(remoteAddress);

  return {
    handleId: "5b1e48fb744607f10068b1f3",
    handleName: handleNameStr,
    userId: userIdStr,
    session,
    impression,
    pacmanId: `${userIdStr}-${session}-${impression}`,
    remoteAddress: ip,
    ipTokens: { ip2, ip3 },
    country: CT.Country.unwrap(country),
    adName: adNameStr,
    channelType: "wap",
    scenarioId: "5b1e48f4744607ce0068b1f4",
    scenarioName: "os-ui",
    deviceClass: "smart",
    trafficType: "REG",
    offerId: CT.OfferId.unwrap(affiliateInfo.offerId),
    adId: "5b1e4807744607ef0068b1f3",
    rockmanId: CT.RockmanId.unwrap(rockmanId),
    landingPageUrl: CT.Url.unwrap(landingPageUrl),
    affId: CT.AffiliateId.unwrap(affiliateInfo.affiliateId),
    headers,
    msisdn: null,
    serverTime: now.getTime(),
    operator: null,
    gateway: null,
    queryTokens,
    getSubMethod: CT.SubMethod.unwrap(subMethod),
    subId: null,
    pubId: null,
    platform: "os-ui",
    serviceIdentifier1: "",
    serviceIdentifier2: "",
    serviceIdentifier3: "",
    pacid: null,
    pabid: null,
    connectionType: "Wifi",
    ip2lOperator: null,
    pageName: "msisdn.html",
    eventType: "impression",
    impressionId: 1
  };
}