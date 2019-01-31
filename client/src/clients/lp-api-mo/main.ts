export type IConfig = {
  host?: string, country?: string, handle?: string, offer: number
}

export type IKeywordShortcode = {
  keyword : string,
  shortcode : string
}

export type IResult = {
  isValid: boolean,
  errorText?: string,
  errorType?: string,
  submissionId?: string,
  keyword: IKeywordShortcode
}

const scenario = process.env.scenario

const defaultConfig = (offer: number) : IConfig => {
  switch(process.env.country) {
    case "my":
      return {
        offer: (offer || 1),
        host: 'm.gamezones.biz',
        country: 'my',
        handle: 'api-handle'
      }
      case "gh": {
        return !!scenario && /gh-sugar-1905-smo/.test(scenario)
        ? {
          offer: (offer || 1),
          host: 'n.sugar-girls.com',
          country: 'gh',
          handle: 'gh-sugar-1905-smo'
        }
        : {
          offer: (offer || 1),
          host: 'w1.mozzi.com',
          country: 'gh',
          handle: 'secure-pro'
        }
      }
      case "th": {
        return {
          offer: (offer || 1),
          host: 't.buz2mobile.com',
          country: 'th',
          handle: 'th-4541311-a2' 
        }
      }
    default:
      throw `'country' environment variable is either missing or has an unsupported value (${process.env.country}). This is necessary for defaultConfig(offer).`
  }
}

export default async function submitMSISDN(window: Window, maybeConfig: IConfig, msisdn: string): Promise<IKeywordShortcode> {
  const config = !maybeConfig ? {offer: window.pac_analytics.visitor.offer} : maybeConfig
  const { host, country, handle, offer } = !config.host || !config.handle || !config.country ? defaultConfig(config.offer) : config
  const search = window.location.search.substr(1) || ''
  const result : IResult = await fetch(`https://lp-api.sam-media.com/v1/submit_msisdn_mo/${host}/${country}/${handle}/${offer}/?msisdn=${msisdn}&rockman_id=${window.pac_analytics.visitor.rockmanId}&${search}`).then(x => x.json())
  if(!result.isValid) {
    const error = new Error(`${result.errorType}:\n${result.errorText}`)
    error['type'] = result.errorType;
    console.error(error)
    throw error
  } else {
    return result.keyword
  }
}