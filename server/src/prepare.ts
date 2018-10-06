import * as fs from "fs";
import { Readable } from "stream";
import * as path from "path";
import * as CT from "./common-types";
import {CampaignValue} from "./campaigns/types"
import * as request from 'request-promise-native'

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

// Replace `<meta name="rockman-id">` with a script tag
const prepareContent = (() => {
  const search = '<meta name="rockman-id">';
  const length = search.length;

  return function(content: string): PreparedContent {
    const index = content.indexOf(search);
    const before = content.substr(0, index);
    const after = content.substr(index + length);

    const beforeBuff = Buffer.from(before, "utf8");
    const afterBuff = Buffer.from(after, "utf8");

    return { beforeBuff, afterBuff };
  };
})();

const getAndCachePreparedContentFromFileSystem = (() => {
  const cache = {};
  return async function(page: string, country: string): Promise<PreparedContent> {
    const cachedItem = cache[page];
    if (!!cachedItem) {
      return cachedItem;
    } else {
      const content = await getPageContent(page, country);
      const item = prepareContent(content);
      cache[page] = item;
      return item;
    }
  };
})();

export default async (rockmanId: CT.NTRockmanId, campaign: CampaignValue) => {
  const {country, page} = campaign
  const visitor = {
    rockmanId: CT.RockmanId.unwrap(rockmanId),
    country: CT.Country.unwrap(country),
    page: CT.HandleName.unwrap(page),
    xaid: CT.AffiliateId.unwrap(campaign.affiliateInfo.affiliateId),
    offer: CT.OfferId.unwrap(campaign.affiliateInfo.offerId)
  }
  
  const { beforeBuff, afterBuff } = await getAndCachePreparedContentFromFileSystem(CT.HandleName.unwrap(page), CT.Country.unwrap(country));
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
};
