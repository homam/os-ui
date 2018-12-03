import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {
  initialState,
  mockedCompletedState,
  HOCProps,
  MSISDNEntryFailure,
  MSISDNEntrySuccess,
  PINEntryFailure,
  PINEntrySuccess,
  match,
  mockedPINState
} from "../../clients/lp-api/HOC";
import * as RDS from "../../common-types/RemoteDataState";
import {
  SimpleOpacityTransition,
  TransitionGroup,
  simpleOpacityTransitionStyles
} from "../../common-components/simple-opacity-transition";

// CSS DECLARATION
import "./assets/css/styles.less?raw";
import { translate } from "../../../webpack/dev-utils/translate-by-yandex";

// IMAGES DECLARATION
// ok
//const imgiphone = require("./assets/images");
// const iphonexs_logo = require('./assets/images/iphonexs_logo.png')

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Unknown" //TODO: replace Unknown with your page's name
);

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn,
    isFlowStep: 0
  };


  toNextPage = () => {
    this.setState({
      isFlowStep: this.state.isFlowStep +=1
    });
  };



  render() {

    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.msisdn);
        }}
      >

        <div
          className={
            "overlay " +
            (this.state.isFlowStep === 2 ? "active" : "")
          }

        ></div>



        <div className={
          "spin-page " +
          (this.state.isFlowStep === 0 ? "active" : "")
        }>


          <div className="intro-text">
          
            <h3>Stand a chance to</h3>
            <h1>Win Cash Prize</h1>
            <h2>for your dream holiday</h2>
          
          </div>

          <button className="btn primary" onClick={this.toNextPage}>Click to win</button>


        </div>

        <div className={
          "destination-page " +
          (this.state.isFlowStep === 1 ? "active" : "")
        }
        >

        <h1>Congratulations</h1>

        <p>
          Your suggested destionation is
        </p>

        <h1>Paris</h1>

        <button className="btn primary" onClick={this.toNextPage}>
          Take me there
        </button>

        </div>



        <div className={
          "msisdn-page " +
          (this.state.isFlowStep === 2 ? "active" : "")
        }
        
        >


          <div className="number-entry">

            <label>Enter you phone number to register</label>
            <div className="input-wrapper">
              <input
                placeholder="Phone number"
                value={this.state.msisdn}
                onChange={ev => this.setState({ msisdn: ev.target.value })}
              />
            </div>
            <button
              className="btn"
              type="submit"
              disabled={RDS.IsLoading(this.props.rds)}
            >
              I want to start now!
      </button>

            {RDS.WhenLoading(null, () => "Wait...")(this.props.rds)}
          </div>
          <div>

            {RDS.WhenFailure(null, (err: MSISDNEntryFailure) => (
              <Translate id={err.errorType} />
            ))(this.props.rds)}
          </div>

        </div>



      </form>
    );
  }
}

class PINEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<PINEntryFailure, PINEntrySuccess>;
  backToStart: () => void;
  onEnd: (pin: string) => void;
}> {
  state = {
    pin: ""
  };
  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.pin);
        }}
      >
        <div className="overlay active"></div>
        <div className="panel active">
          <div className="rays">

          </div>
          <div className="centerpiece">
          </div>


          <div>
            <Translate id="we_just_sent_a_pin" />
          </div>

          <div id="pin-entry">
            <input
              placeholder="PIN"
              className="pin-input"
              value={this.state.pin}
              onChange={ev => this.setState({ pin: ev.target.value })}
            />
            <button type="submit" className="btn" disabled={RDS.IsLoading(this.props.rds)}>
              <Translate id="pin-submit-btn" />
            </button>
            {RDS.WhenLoading(null, () => <div />)(this.props.rds)}
          </div>

          <div>
            {RDS.match({
              failure: (err: PINEntryFailure) => (
                <div>
                  <div>
                    <Translate id={err.errorType} />
                  </div>
                  <Translate
                    id="if_not_your_mobile"
                    values={{
                      phone: this.props.msisdn
                    }}
                  />
                  &nbsp;
                <a onClick={() => this.props.backToStart()}>
                    <Translate id="click_here_to_change_your_number" />
                  </a>
                </div>
              ),
              nothingYet: () => (
                <div>
                  <Translate
                    id="didnt_receive_pin_yet"
                    values={{
                      phone: this.props.msisdn
                    }}
                  />
                  &nbsp;
                <a onClick={() => this.props.backToStart()}>
                    <Translate id="click_here_to_change_your_number" />
                  </a>
                </div>
              ),
              loading: () => null,
              success: () => null
            })(this.props.rds)}
          </div>
        </div>
      </form>
    );
  }
}

const TQStep = ({ finalUrl }: { finalUrl: string }) => (
  <div>
    <h3>Thank you!</h3>
    <a href={finalUrl}>Click here to access the product</a>
  </div>
);

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    msisdn: "",

  };

  defaultLang = () => {
    document.getElementsByTagName('html')[0].setAttribute("lang", "ar");
  }

  componentDidMount() {
    this.defaultLang();
  }
  render() {

    return (

      <div id="container">
        <div className="header">

          <p>Exclusive for <span className="operator-name"></span> users only!</p>

          <div className="lang-btns">

            <button className="lang-btn"
              onClick={() => {
                if (this.state.locale === "en") {
                  this.setState({ locale: "ar" })
                  document.getElementsByTagName('html')[0].setAttribute("lang", "ar")
                } else {
                  this.setState({ locale: "en" })
                  document.getElementsByTagName('html')[0].setAttribute("lang", "en")
                }
              }}
            >{
                this.state.locale === "ar"
                  ? "eng"
                  : "عربى"
              }</button>


          </div>

        </div>

        <div id="creative">




          <div>
            <TranslationProvider locale={this.state.locale}>

              {match({
                msisdnEntry: rds => (
                  <SimpleOpacityTransition key="msisdnEntry">
                    <MSISDNEntryStep
                      msisdn={this.state.msisdn}
                      rds={rds}
                      onEnd={msisdn => {
                        this.setState({ msisdn });
                        this.props.actions.submitMSISDN(window, null, msisdn);
                      }}
                    />
                  </SimpleOpacityTransition>
                ),
                pinEntry: rds => (
                  <SimpleOpacityTransition key="pinEntry">
                    <PINEntryStep
                      onEnd={pin => this.props.actions.submitPIN(pin)}
                      backToStart={() => this.props.actions.backToStart()}
                      msisdn={this.state.msisdn}
                      rds={rds}
                    />
                  </SimpleOpacityTransition>
                ),
                completed: ({ finalUrl }) => (
                  <SimpleOpacityTransition key="completed">
                    <TQStep finalUrl={finalUrl} />
                  </SimpleOpacityTransition>
                )
              })(this.props.currentState)}

            </TranslationProvider>
          </div>
        </div>
      </div>
    );
  }
}

export default HOC(tracker, Root)(initialState);

