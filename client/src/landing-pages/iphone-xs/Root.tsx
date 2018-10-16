import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {ITolaProps, MatchSuccess, TolaRDS, TolaFailure, initialState, mockLoadingState, mockSuccessState} from "../../clients/mpesa/TolaHOC";
import * as RDS from "../../common-types/RemoteDataState";
import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import './assets/styles.less?raw'

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "iphone-xs"
);
const alphabet =  "BDGHJKLMNPQRTVXWZ123456789".split('');
const random = (items) => items[Math.floor(Math.random()*items.length)];
const randomString = (n) => n < 1 ? '' : random(alphabet) + randomString(n - 1)

const price = 199;
const uniqueCode = `iPHONE_${randomString(4)}`

const imgiphone = require('./assets/images/iphone.png')
const iphonexs_logo = require('./assets/images/iphonexs_logo.png')

type MSISDNEntryProps = {
  msisdn: string;
  rds: TolaRDS;
  onEnd: (msisdn: string) => void;
}

class MSISDNEntryStep extends React.PureComponent<MSISDNEntryProps, {msisdn: string, waited: boolean}> {
  state = {
    msisdn: this.props.msisdn,
    waited: false
  };

  waitedTimer = null;

  componentDidUpdate(prevProps: MSISDNEntryProps, prevState, snapshot) {
    if(!!this.waitedTimer && (RDS.IsLoading(prevProps.rds) || RDS.IsFailure(this.props.rds))) {
      clearTimeout(this.waitedTimer)
    } 
  }

  render() {
    const readyToSubmit = !!this.state.msisdn && this.state.msisdn.length == 10;
    const inputDisabled = RDS.IsLoading(this.props.rds) && !this.state.waited
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.msisdn);
          this.setState({waited: false})
          this.waitedTimer = setTimeout(() => {
            this.setState({waited: true})
          }, 6000);
        }}
      >
      <h1 className='main-title'>You have a chance to win the new</h1>
      <img className="iphonexs-logo" src={iphonexs_logo} />
      <img className="main-phone" src={imgiphone} />
      <div className="box">
        <input
          maxLength={10}
          type="tel"
          disabled={inputDisabled}
          className={`msisdn-input ${inputDisabled ? 'loading' : ''}`}
          placeholder="Phone number"
          value={this.state.msisdn}
          onChange={ev => this.setState({ msisdn: ev.target.value.length <= 10 ? ev.target.value : this.state.msisdn })}
        />
        <button className={`submit-button ${readyToSubmit ? 'enabled' : ''}`} type="submit" disabled={RDS.IsLoading(this.props.rds)}>OK</button>
        {
            RDS.WhenFailure(null, (err : TolaFailure) => 
              <div className="error">
                <Translate id={err.type} />
              </div>
            )(this.props.rds)
        }
        </div>
        <div className={`mpesa-pin ${RDS.IsLoading(this.props.rds) ? 'visible' : ''}`}>
        {
          RDS.WhenLoading(null, () => <div>
              <div><Translate id="enter_your_mpesa_pin" /></div>
              <div className={`waited ${this.state.waited ? 'visible' : ''}`}>
                Didn't receive a payment prompt from M-pesa yet?
                Please check that you have entered a correct mobile number and the number is associated with your M-pesa account.
              </div>
            </div>
          )(this.props.rds)
        }
        </div>
        <div>
          
        </div>
      </form>
    );
  }
}


const TQStep = ({onPayAgain, entriesWon}) => <div className="tq-container">
  <h1 className='main-title'>Congratulations!</h1>
  <img className="main-phone" src={imgiphone} />
  <h3>Thank you, have have won [{entriesWon}] entry to the draw</h3>
  <div>
    Enter as many times as you like to increase your chances.
  </div>
  <div className="tq-cta-container">
    <button className="tq-button yes" onClick={() => onPayAgain()}>Yes I want more chances</button>
    <button className="tq-button no">No, thank you!</button>
  </div>
</div>;

class Root extends React.PureComponent<ITolaProps, {locale: string, entriesWon: number, msisdn: string}> {
  state = {
    locale: "en",
    entriesWon: 0,
    msisdn: "07",
  };
  componentDidUpdate(prevProps : ITolaProps, prevState, snapshot) {
    if(RDS.IsLoading(prevProps.currentState) && RDS.IsSuccess(this.props.currentState)){
      this.setState(({entriesWon}) => ({entriesWon: entriesWon + 1}))
    }
  }
  render() {
    const tqStep = (
        <TQStep entriesWon={this.state.entriesWon} onPayAgain={() => this.props.actions.chargeAndWait(this.state.msisdn, uniqueCode, price) } />
    )
    return (
      <div>
        <TranslationProvider locale={this.state.locale}>
          <div>
            {
              MatchSuccess({
                otherwise: (rds) => (
                  this.state.entriesWon > 0
                  ? tqStep
                  :
                      <MSISDNEntryStep
                        msisdn={this.state.msisdn}
                        rds={rds}
                        onEnd={msisdn => {
                          this.setState({ msisdn });
                          this.props.actions.chargeAndWait(msisdn, uniqueCode, price);
                        }}
                      />
                ),
                success: () => tqStep
              })(this.props.currentState)
            }
            <div className='disclaimer'>
              <Translate id="disclaimer" />
            </div>
          </div>
        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);