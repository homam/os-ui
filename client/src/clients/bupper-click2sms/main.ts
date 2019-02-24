import { IKeywordShortcode } from "../lp-api-mo/main";

type Config = {host?: string, country?: string, campaign?: string}
export type IConfig = 
    | {tag: "bupper"} & Config 
    | {tag: "keywordAndShortCode"}
  | { tag: "keyword" } & Config

export { IKeywordShortcode }

const defaultConfig : Config = (() => {
  switch(process.env.country) {
      // case "gh": {
      //   return {
      //     offer: (offer || 1),
      //     host: 'w1.mozzi.com',
      //     country: 'gh',
      //     handle: '18plus-oc2sms'
      //   }
      // }
      // case "hu": {
      //   // curl "http://w.mozzi.biz/spa-api/?country=hu&device=smart&slug=gameclub&action=oc2sms"
      //   return {
      //     offer: (offer || 1),
      //     host: "w.mozzi.biz",
      //     country: "hu",
      //     handle: "gameclub"
      //   }
      // }
      case "nl": {
        return {
          country: "nl",
          host: "n.gamezones.biz",
          campaign: "5c6a2be8a305283e528b4582",        }
      }
    default:
      throw `'country' environment variable is either missing or has an unsupported value (${process.env.country}). This is necessary for defaultConfig(offer).`
  }
})()

type IFetchResult = { "success": boolean, "uid": string, "shortcode": string, "keyword": string, message?: string }

async function load1(window: Window, config: IConfig, keyword?: string) {
  const offer = window.pac_analytics.visitor.offer

  if (config.tag != "keywordAndShortCode") {
    const { host, country, campaign } = { 
        host: config.host || defaultConfig.host
      , campaign: config.campaign || defaultConfig.campaign
      , country: !config.country || defaultConfig.country 
    }
    const result: IFetchResult = await fetch(
      `https://${host}/tallyman/v2/?rockman_id=${window.pac_analytics.visitor.rockmanId}&action=oc2sms&campaign_id=${campaign}&offerId=${offer}${!!keyword ? '&keyword=' + keyword : ''}`
    ).then(x => x.json())
    if (!result.success) {
      throw result.message;
    } else {
      return { keyword: `${result.keyword} ${result.uid}`, shortcode: result.shortcode }
    }
  }
}

export default async function load(window: Window, maybeConfig: IConfig, keyword?: string, shortcode?: string): Promise<IKeywordShortcode> {
  
  if(!!maybeConfig && maybeConfig.tag == "keywordAndShortCode") {
    return {keyword, shortcode} as IKeywordShortcode
  } else if(!!maybeConfig && maybeConfig.tag == "keyword") {
    return load1(window, maybeConfig, keyword)
  } else {
    return load1(window, maybeConfig, null)
  }
  
}
// {"success":true,"uid":"*5QADM","shortcode":"1901","keyword":"TIPS"}%  
// curl "http://w1.mozzi.com/spa-api/?country=gh&device=smart&slug=18plus-oc2sms&action=oc2sms"