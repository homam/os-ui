import * as fs from "fs";
import { Readable } from "stream";
import * as path from "path";
import * as CT from "./common-types";
import {UnresolvedCampaignValue} from "./campaigns/types"
import * as request from 'request-promise-native'
import { Option } from "fp-ts/lib/Option";

const evnPagesRoot = process.env.root;
const pagesRootPath = evnPagesRoot || path.join(__dirname, `/../../client/dist/`); // by default we assume we are running the server from the main git repo
const getPageContent = async (page: string, maybeCountry: Option<CT.NTCountry>) : Promise<string> => {
  const pagePath = maybeCountry.fold(`static/${page}/html/index.ssr.html`, country => `static/${page}/html/index_${CT.Country.unwrap(country)}.ssr.html`)
  console.log(`Fetching...`, pagesRootPath + pagePath)
  if(pagesRootPath.startsWith('http')) {
    return request.get(pagesRootPath + pagePath)
  } else {
    return fs.readFileSync(
      path.join(pagesRootPath, pagePath),
      "utf8"
    );
  }
}



const prepareContent = (() => {
  return function(content: string): () => Readable {
    const buff = Buffer.from(content, "utf8");
    return () => {
      const s = new Readable();
      s.push(content)
      s.push(null)
      return s;
    }
  };
})();

const getAndCachePreparedContentFromFileSystem = (() => {
  const cache = {};
  return async function(page: string, country: Option<CT.NTCountry>, skipCache: boolean): Promise<() => Readable> {
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

export default async (page: CT.NTHandleName, country: Option<CT.NTCountry>, skipCache: boolean) : Promise<Readable> => {
  
  const serve = await getAndCachePreparedContentFromFileSystem(CT.HandleName.unwrap(page), country, skipCache);

  return serve()
};
