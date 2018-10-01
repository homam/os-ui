export type IConfig = {
  host: string, country: string, handle: string, offer: number
}

export type IResult = {
  finalUrl?: string,
  isValid: boolean,
  errorText?: string,
  errorType?: string,
  submissionId?: string
}

export default async function submitMSISDN(window: Window, { host, country, handle, offer }: IConfig, msisdn: string): Promise<(pin: string) => Promise<string>> {
  const search = window.location.search.substr(1)
  const result : IResult = await fetch(`http://lp-api.sam-media.com/v1/submit_msisdn/${host}/${country}/${handle}/${offer}/?msisdn=${msisdn}&${search}`).then(x => x.json())
  if(!result.isValid) {
    const error = new Error(`${result.errorType}:\n${result.errorText}`)
    error['type'] = result.errorType;
    throw error
  } else {
    return async function submitPIN(pin: string) : Promise<string> {
      try {
        const pinResult : IResult = await fetch(`http://lp-api.sam-media.com/v1/submit_pin?pin=${pin}&sid=${result.submissionId}`).then(x => x.json())
        if(!pinResult.isValid) {
          const pinError = new Error(`${result.errorType}:\n${result.errorText}`)
          pinError['type'] = result.errorType;
          throw pinError
        } else {
          return pinResult.finalUrl
        }
      } catch(ex) {

      }
    }
  }
}