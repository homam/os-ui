import * as React from "react"
import { ITracker } from "../../pacman/record";

type IState = "NothingYet" | "Clicked";
type IActions = {
  onClick: () => void
}
export type IProps = {
  currentState: IState;
  actions: IActions;
};

export type IConfig = {
  host?: string, country?: string, handle?: string, offer?: number
}


// `http://n.mobzonefun.com/uk/yoga-videos?offer=1435&&msisdn=1&operator=UK_VODAFONE&msisdnSubmitted=Y&skipTrigger=1&network_type=mobile_data&identified=1&ms=1&operatorSubmitted=Y&platform=mcb&SubscribeMo=1&shortcode=86707&atmobirun=1`

const getRedirectUrl = (maybeConfig : IConfig) : string => {
  const offer = maybeConfig.offer || window.pac_analytics.visitor.offer
  const search = window.location.search.substr(1) || ''
  const scenario = process.env.scenario

  switch(process.env.country) {
    case "gb": 
      if(!!scenario && /uk-tv86707-24h/ig.test(scenario))  {
        var handle = maybeConfig.handle || 'uk-tv86707-24h'
      } else {
        var handle = maybeConfig.handle || 'yoga-videos'
      }
      var host = maybeConfig.host || 'n.mobzonefun.com'
      var tq_url = encodeURIComponent(`${window.location.protocol}://${window.location.host}/pixels/?rockman_id=${window.pac_analytics.visitor.rockmanId}`)
      return `http://${host}/uk/${handle}?offer=${offer}&atmobirun=1&rockman_id=${window.pac_analytics.visitor.rockmanId}&redirPixels=${window.location.host}&${search}`
    case "iq":

      if(!!scenario && /iq-gmz2884-3g/ig.test(scenario)) { 
        // 'IQ - Iraqcom - 2884 - 3G'
        var handle = maybeConfig.handle || 'iq-gmz2882-3g' // 'iq-gmz2884-3g'

      } else if (/iq-vid2888-3g/ig.test(scenario)) {
        // 'IQ - Iraqcom - 2888 - 3G'
        var handle = maybeConfig.handle || 'iq-vid2888-3g' // 'iq-vid2888-3g'

      } else {
        // 'IQ - Iraqcom - 2882 - 3G'
        var handle = maybeConfig.handle || 'iq-gmz2882-3g' // 'iq-gmz2882-3g'
      }

      return `http://n.videozland.com/iq/${handle}?device=smart&offer=${offer}&atmobirun=1&rockman_id=${window.pac_analytics.visitor.rockmanId}&redirPixels=${window.location.host}&${search}`
    default:
      throw `'country' environment variable is either missing or has an unsupported value (${process.env.country}). This is necessary for defaultConfig(offer).`
  }
}

export function match<R>
  (matcher: {nothingYet : () => R})
  { return (state: IState) =>  state == "NothingYet" ? matcher.nothingYet() : <div>...</div>}


export default (tracker: ITracker, maybeConfig: IConfig, Comp: React.ComponentType<IProps>) => (initState: IState) => 
  class HOC extends React.PureComponent<any,{current: IState}> {
    state = {
      current: initState
    }
    actions = {
      onClick: () => {
        const url = getRedirectUrl(maybeConfig || {})
        tracker.advancedInFlow('one-click/v1', 'click', {url})
        window.location.href = url
      }
    } as IActions; 

    render() {
      const self = this;
      return (
        <Comp
          actions={self.actions}
          currentState={self.state.current}
          {...this.props}
        />
      );
    }
  }


export function Link ({maybeConfig, tracker, children, ...props} : {maybeConfig? : IConfig, tracker: ITracker, children: React.ReactNode} & React.HTMLProps<HTMLAnchorElement>)  {
  const url = getRedirectUrl(maybeConfig || {})
  return <a {...props} onClick={() => tracker.advancedInFlow('one-click/v1', 'click', {url})} href={url}>{children}</a>
}

  export const initialState : IState = "NothingYet"