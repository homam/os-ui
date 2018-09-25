import * as fs from "fs";
import { Readable } from "stream";
import * as path from "path";
import * as CT from "./common-types";
import {CampaignValue} from "./campaigns/types"

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
  return function(page: string): PreparedContent {
    const cachedItem = cache[page];
    if (!!cachedItem) {
      return cachedItem;
    } else {
      const content = fs.readFileSync(
        path.join(__dirname, "/../../dist/static/first/html/index.ssr.html"),
        "utf8"
      );
      const item = prepareContent(content);
      cache[page] = item;
      return item;
    }
  };
})();

export default (rockmanId: CT.NTRockmanId, campaign: CampaignValue) => {
  const {country, page} = campaign
  const pacman = {
    rockmanId: CT.RockmanId.unwrap(rockmanId),
    country: CT.Country.unwrap(country)
  }
  
  const { beforeBuff, afterBuff } = getAndCachePreparedContentFromFileSystem(CT.HandleName.unwrap(page));
  const s = new Readable();
  s.push(beforeBuff);
  s.push(
    `<script>window.pac_analytics={
      visitor:${JSON.stringify(pacman)},
      startTime: new Date().valueOf()
    }</script>`
  );
  s.push(afterBuff);
  s.push(null);

  return s;
};
