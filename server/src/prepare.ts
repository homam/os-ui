import * as fs from "fs";
import { Readable } from "stream";
import * as path from "path";
import * as CT from "./common-types";
import {ResolvedCampaignValue} from "./campaigns/types"
import * as request from 'request-promise-native'

type IVisitor = {
  rockmanId: string;
  impressionNumber: number;
  country: string;
  page: string;
  xaid: string;
  cid: number;
  offer: number;
}

const evnPagesRoot = process.env.root;
const pagesRootPath = evnPagesRoot || path.join(__dirname, `/../../client/dist/`); // by default we assume we are running the server from the main git repo
const getPageContent = async (page: string, country: string) : Promise<string> => {
  console.log(`Fetching...`, pagesRootPath + `static/${page}/html/index_${country}.ssr.html`)
  if(pagesRootPath.startsWith('http')) {
    return request.get(pagesRootPath + `static/${page}/html/index_${country}.ssr.html`)
  } else {
    return fs.readFileSync(
      path.join(pagesRootPath, `static/${page}/html/index_${country}.ssr.html`),
      "utf8"
    );
  }
}

type PreparedContent = {
  beforeBuff: Buffer;
  afterBuff: Buffer;
};

const prepareContent = (() => {

  const pacmanSearch = '<meta name="rockman-id">';
  const pacmanLength = pacmanSearch.length;

  const fieldSearch = '<input type="hidden" name="rockman_id"/>'
  const fieldLength = fieldSearch.length

  return function(content: string): (visitor : IVisitor) => Readable {
    const pacmanIndex = content.indexOf(pacmanSearch);
    const pacmanBefore = content.substr(0, pacmanIndex);
    const pacmanAfter = content.substr(pacmanIndex + pacmanLength);

    const beforeBuff = Buffer.from(pacmanBefore, "utf8");

    const fieldIndex = pacmanAfter.indexOf(fieldSearch);
    if(fieldIndex < 0) {

      const afterBuff = Buffer.from(pacmanAfter, "utf8");
  
      return (visitor) => {
        const s = new Readable();
        s.push(beforeBuff);
        s.push(
          `<script>window.pac_analytics={
            visitor:${JSON.stringify(visitor)},
            startTime: new Date().valueOf(),
            url: '/analytics'
          }</script>`
        );
        s.push(afterBuff);
        s.push(null);
        return s;
      }
    } else {

      const fieldBefore = pacmanAfter.substr(0, fieldIndex);
      const fieldAfter = pacmanAfter.substr(fieldIndex + fieldLength);
      const beforeFieldBuff = Buffer.from(fieldBefore, "utf8");
      const afterFieldBuff = Buffer.from(fieldAfter, "utf8");

      return (visitor) => {
        const s = new Readable();
        s.push(beforeBuff);
        s.push(
          `<script>window.pac_analytics={
            visitor:${JSON.stringify(visitor)},
            startTime: new Date().valueOf(),
            url: '/analytics'
          }</script>`
        );
        s.push(beforeFieldBuff);
        s.push(`<input type="hidden" name="rockman_id" value="${visitor.rockmanId}"/>`)
        s.push(afterFieldBuff)
        s.push(null)
        return s
      }
    }
  };
})();

const getAndCachePreparedContentFromFileSystem = (() => {
  const cache = {};
  return async function(page: string, country: string, skipCache: boolean): Promise<(visitor: IVisitor) => Readable> {
    const cachedItem = cache[page];
    if (!skipCache && !!cachedItem) {
      return cachedItem;
    } else {
      const content = await getPageContent(page, country);
      const item = prepareContent(content);
      cache[page] = item;
      return item;
    }
  };
})();

export default async (rockmanId: CT.NTRockmanId, impressionNumber: CT.NTImpressionId, campaign: ResolvedCampaignValue, skipCache: boolean) : Promise<Readable> => {
  const {country, page} = campaign
  const visitor = {
    rockmanId: CT.RockmanId.unwrap(rockmanId),
    impressionNumber: CT.ImpressionNumber.unwrap(impressionNumber),
    country: CT.Country.unwrap(country),
    page: CT.HandleName.unwrap(page),
    xaid: CT.AffiliateId.unwrap(campaign.affiliateInfo.affiliateId),
    cid: campaign.id,
    offer: CT.OfferId.unwrap(campaign.affiliateInfo.offerId)
  }
  
  const serve = await getAndCachePreparedContentFromFileSystem(CT.HandleName.unwrap(page), CT.Country.unwrap(country), skipCache);

  return serve(visitor)
};
