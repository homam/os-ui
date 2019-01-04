import { ITracker } from "../../pacman/record";
import * as React from 'react'

export type IConfig = {
  country?: string, host?: string, handle?: string, offer: number
}

export const defaultConfig = (offer: number) : IConfig => {
  switch (process.env.country) {
    case "za":
      return {
        offer,
        country: "za",
        host: "n.vidzclubs.com",
        handle: "yes-flow-test"
      }
    default:
      const errorMsg = `'country' environment variable is either missing or has an unsupported value (${process.env.country}). This is necessary for defaultConfig(offer).`
      console.error(errorMsg)
      throw errorMsg;
  }
}

export function makePhoneSubmissionUrl(config: IConfig, phone: string) {
  const search = window.location.search.substr(1) || ''
  return `http://${config.host}/${config.country}/${config.handle}?country=${config.country}&handle=${config.handle}&offer=${config.offer}&msisdnSubmitted=Y&msisdn%5B0%5D=${phone}&legalCheckbox=Y&incentivizedCheckbox=Y&op_confirmCheckbox=N&rockman_id=${window.pac_analytics.visitor.rockmanId}&${search}`
}

export function submitPhone(maybeConfig: IConfig, phone1: string) {
  const phone = phone1[0] != "0" ? "0" + phone1 : phone1 // bupper expects msisdn to start with 0
  const config = !maybeConfig ? {offer: window.pac_analytics.visitor.offer} : maybeConfig
  const { host, country, handle, offer } = !config.host || !config.handle || !config.country ? defaultConfig(config.offer) : config
  const iframe= document.createElement('iframe');
  iframe.setAttribute('src', makePhoneSubmissionUrl({ host, country, handle, offer }, phone));
  iframe.setAttribute('width', '1');
  iframe.setAttribute('height', '1');
  document.body.appendChild(iframe);
}

export type State = {type: "NothingYet"} | {type: "MsisdnEntered" }

export const initialState : State = {type: "NothingYet"}

export interface IActions {
  submitMSISDN: (window: Window, config: IConfig, msisdn: string) => any,
}

export interface HOCProps {
  currentState: State;
  actions: IActions;
};

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

export function match<R>(
  {nothingYet, msisdnEntered} : 
  {
    nothingYet : () => R,
    msisdnEntered: () => R
  }
): (state: State) => R {
  return state => {
    switch (state.type) {
      case "NothingYet":
        return nothingYet()
    
      case "MsisdnEntered":
        return msisdnEntered()
    }
  }
}

export default <P extends HOCProps>(tracker: ITracker, Comp: React.ComponentType<P>) => (
  initialState: State
) =>
  class HOC extends React.PureComponent<P> {
    state: {
      currentState: State;
    };
    actions: IActions
    constructor(props) {
      super(props);
      const self = this;
      this.state = {
        currentState: initialState
      }

      this.actions = {
        submitMSISDN: (window, config, msisdn) => {
          this.setState({
            currentState: {type: "MsisdnEntered"}
          })
          tracker.advancedInFlow('redir-to-send-sms', 'msisdn-submitted', { msisdn })
          submitPhone(config, msisdn)
        }
    }
  }

  render() {
    return <Comp {...this.props} currentState={this.state.currentState} actions={this.actions} />
  }
}