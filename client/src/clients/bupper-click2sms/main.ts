import { IKeywordShortcode } from "../lp-api-mo/main";

type Config = {host?: string, country?: string, handle?: string, offer: number}
export type IConfig = {tag: "bupper"} & Config | {tag: "keywordAndShortCode"} & IKeywordShortcode
export { IKeywordShortcode }

const defaultConfig = (offer: number) : Config => {
  switch(process.env.country) {
      case "gh": {
        return {
          offer: (offer || 1),
          host: 'w1.mozzi.com',
          country: 'gh',
          handle: 'secure-pro'
        }
      }
    default:
      throw `'country' environment variable is either missing or has an unsupported value (${process.env.country}). This is necessary for defaultConfig(offer).`
  }
}

type IFetchResult = { "success": boolean, "uid": string, "shortcode": string, "keyword": string, message?: string }

export default async function load(window: Window, maybeConfig: IConfig): Promise<IKeywordShortcode> {
  
  if(!!maybeConfig && maybeConfig.tag == "keywordAndShortCode") {
    const {keyword, shortcode} = maybeConfig
    return {keyword, shortcode} as IKeywordShortcode
  } else {
    const config = !maybeConfig ? {offer: window.pac_analytics.visitor.offer} : (maybeConfig as Config)
    const { host, country, handle, offer } = !config.host || !config.handle || !config.country ? defaultConfig(config.offer) : config
    const result : IFetchResult = await fetch(`http://${host}/spa-api/?country=${country}&device=smart&slug=${handle}&action=oc2sms&offer=${offer}`).then(x => x.json())
    if(!result.success) {
      throw result.message;
    } else {
      return {keyword: `${result.keyword}${result.uid}`, shortcode: result.shortcode}
    }
  }
  
}
// {"success":true,"uid":"*5QADM","shortcode":"1901","keyword":"TIPS"}%  
// curl "http://w1.mozzi.com/spa-api/?country=gh&device=smart&slug=18plus-oc2sms&action=oc2sms"