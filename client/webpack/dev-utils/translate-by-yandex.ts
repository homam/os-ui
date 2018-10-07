/*
  This module expects osui_yandex_key environment variable.
*/
import asyncPool from "tiny-async-pool";
import fetch from 'node-fetch'
import R from "ramda";
export async function translate(from: string, to: string, texts: string[]) : Promise<string[]> {
  const {osui_yandex_key} = process.env
  if(!osui_yandex_key) {
    throw "osui_yandex_key environment variable is missing. This is necessary for Yandex translation.";
  }
  const translateOneBatch = async (ts: string[]) : Promise<string[]> => {
    const qs = ts.map(t => `text=${encodeURIComponent(t)}`).join("&");
    const res = await fetch(
      `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${osui_yandex_key}&${qs}&lang=${from}-${to}`
    ).then(x => x.json()).then(x => x.text);
    return res
  }
  // Yandex supports multiple text parameters in the query string, so we can translate our array in batches.
  const batches = R.splitEvery(9, texts);
  const results : string[][] = await asyncPool(2, batches, translateOneBatch);
  return R.chain(x => x, results)
}

interface IHash {
  [key: string]: string
}
export async function translateHash(from: string, to: string, hash: IHash) {
  const pairs = R.toPairs(hash);
  const values = await translate(from, to, pairs.map(p => p[1]));
  const zipped = R.zip(pairs, values).map(([[k, _], v]) => [k, v] as R.KeyValuePair<string, string>)
  return R.fromPairs(zipped)
}
