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
import TimerComponent from '../../common-components/timer/timer';
import {
  SimpleOpacityTransition,
  TransitionGroup,
  simpleOpacityTransitionStyles
} from "../../common-components/simple-opacity-transition";

// CSS DECLARATION
import "./assets/css/styles.less?raw";
import { translate } from "../../../webpack/dev-utils/translate-by-yandex";
import Timer from "../first/components/Timer";
import CustomTesti from "../bid-win/components/CustomTesti";
import { mockedMSISDNEntrySuccess } from "../../clients/lp-api-mo/HOC";
import MsisdnInput from "../../common-components/msisdn/msisdn-input";


// IMAGES DECLARATION
// ok
const history = require("./assets/img/history.svg");
const pinPoint = require("./assets/img/pin-point.svg");
const planeHotBalloon = require("./assets/img/plane-balloon-cloud.png");

// const iphonexs_logo = require('./assets/images/iphonexs_logo.png')

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Win Travel" //TODO: replace Unknown with your page's name
);

function Wait(props) {
  return (
    <Translate id="wait_message" />
  )
}

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    locale: "ar",
    msisdn: this.props.msisdn,
    firstStep: 1,
    secondStep: 0,
    msisdnPage: 0
  };

  showPage2 = () => {
    this.setState({
      firstStep: 0,
      secondStep: 1,
      msisdnPage: 0
    })
  }
  showMsisdn = () => {
    this.setState({
      firstStep: 0,
      secondStep: 0,
      msisdnPage: 1
    })
  }


  render() {

    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.msisdn);
        }}
      >

        {/* INSERT FIRST PRELANDING HERE */}
        <div className="top-bar">
          <Translate id="top-bar"></Translate>
        </div>
        <div className="header">
          <p><Translate id="exclusive-for"></Translate> <span className="operator-name"></span> <Translate id="users"></Translate></p>
        </div>
        <div className={"spin-page " + (this.state.firstStep === 1 ? "active" : "")}>
          <div className="wrapper">
            <div className="intro-text">
              <div className="headline"></div>
              <div className="position-container">
                <div className="plane-hot-balloon vibrate-slow">
                  <img src={planeHotBalloon} />
                </div>
              </div>
            </div>
          </div>
          <div className="pin-point-container">
            <img className="pin-pint-img" src={pinPoint} />
          </div>
          <div className="cta-container cta-container-2">
            <button className="btn click-to-win" onClick={this.showPage2} type="button">
              <Translate id="click-to-win"></Translate>
            </button>
          </div>
          <div className="world-container">
            <div className="world"></div>
          </div>
        </div>

        {/* INSERT SECOND PRELANDING HERE */}
        <div className={"destination-page " + (this.state.secondStep === 1 ? "active" : "")}>
          <div className="destination-page-bg">
            <div className="wrapper">
              <div className="fireworks"></div>
              <div className="congrats-container">
                <div className="congrats-title">
                  <Translate id="congratulations"></Translate>
                </div>
                <div className="destination-title">
                  <Translate id="your-destination"></Translate>
                </div>
                <div className="paris-title"></div>
              </div>
            </div>
            <div>
              <div className="cta-container cta-container-2">
                <button className="btn click-to-win" onClick={this.showMsisdn} type="button">
                  <Translate id="take-me-there"></Translate>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* INSERT MSISDN PAGE HERE */}
        <div className={"msisdn-page " + (this.state.msisdnPage === 1 ? "active" : "")}>
          <div className="blue-bg">
            <div className="banner-container">
              <div className="cash-flag"></div>
              <div className="banner"></div>
            </div>
            <div className="cta-container sm">
              <div className="banner-headline"></div>
              <div className="counter">
                <div className="counter-title">
                  <strong><Translate id="hurry"></Translate></strong>
                </div>
                <div className="counter-time">
                  <Timer duration={30} /> <span className="font-sm"><Translate id="sec"></Translate></span>
                </div>
                <div>
                  <div className="subheadline-text">
                    <Translate id="subheadline-text"></Translate>
                  </div>
                </div>
                <div className="input-container">
                  <div className="number-entry">

                    <MsisdnInput maxLength={8}
                      onChange={(msisdn) => this.setState({ msisdn })}
                      countryCode={'+973'}></MsisdnInput>

                    <button className="btn click-to-win relative" type="submit" disabled={RDS.IsLoading(this.props.rds)}>
                      <Translate id="subscribe"></Translate>
                    </button>
                    {RDS.WhenLoading(null, () => <Wait />)(this.props.rds)}
                  </div>

                  <div className="error-msg">
                    {RDS.WhenFailure(null, (err: MSISDNEntryFailure) => (
                      <Translate id={err.errorType} />
                    ))(this.props.rds)}
                  </div>
                </div>
                <div className="disclaimer">
                  <p><Translate id="disclaimers" /></p>
                </div>
              </div>
              <div className="testimonial">
                <CustomTesti
                  className="win-travel-testimonial"
                  testimonials={
                    [
                      {
                        Message: () => <span className="message"><Translate id="testimonial-1"></Translate></span>,
                        Name: () => <span className="testimonials-name"> - <Translate id="zakaria"></Translate></span>,
                        stars: 5
                      },
                      {
                        Message: () => <span className="message"><Translate id="testimonial-2"></Translate></span>,
                        Name: () => <span className="testimonials-name"> - <Translate id="fatima"></Translate></span>,
                        stars: 5
                      },
                      {
                        Message: () => <span className="message"><Translate id="testimonial-3"></Translate></span>,
                        Name: () => <span className="testimonials-name"> - <Translate id="karim"></Translate></span>,
                        stars: 5
                      }
                    ]
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {/* END OF MSISDN PAGE */}
      </form>
    );
  }
}

 {/* INSERT PIN PAGE HERE*/}
class PINEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<PINEntryFailure, PINEntrySuccess>;
  backToStart: () => void;
  onEnd: (pin: string) => void;
}> {
  state = {
    pin: "",
    locale: "ar"
  };
  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.pin);
        }}
      >

        <div className="black-bg"></div>
        <div className="top-bar">
          <Translate id="top-bar"></Translate>
        </div>
        <div className="header">
          <p><Translate id="exclusive-for"></Translate> <span className="operator-name"></span> <Translate id="users"></Translate></p>
        </div>
        <div className="msisdn-page active">
          <div className="blue-bg">
            <div className="banner-container">
              <div className="cash-flag"></div>
              <div className="banner"></div>
            </div>
            <div className="cta-container sm">
              <div className="banner-headline"></div>
              <div className="counter">
                <div className="counter-title">
                  <strong><Translate id="hurry"></Translate></strong>
                </div>
                <div className="counter-time">
                </div>
                <div>
                  <div className="subheadline-text">
                    <Translate id="subheadline-text"></Translate>
                  </div>
                </div>
                <div className="input-container">
                  <div className="number-entry">

                  </div>

                </div>
              </div>
              <div className="testimonial">
                <CustomTesti
                  className="win-travel-testimonial"
                  testimonials={
                    [
                      {
                        Message: () => <span className="message"><Translate id="testimonial-1"></Translate></span>,
                        Name: () => <span className="testimonials-name"> - <Translate id="zakaria"></Translate></span>,
                        stars: 5
                      },
                      {
                        Message: () => <span className="message"><Translate id="testimonial-2"></Translate></span>,
                        Name: () => <span className="testimonials-name"> - <Translate id="fatima"></Translate></span>,
                        stars: 5
                      },
                      {
                        Message: () => <span className="message"><Translate id="testimonial-3"></Translate></span>,
                        Name: () => <span className="testimonials-name"> - <Translate id="karim"></Translate></span>,
                        stars: 5
                      }
                    ]
                  }
                />
              </div>
            </div>
            <div className="disclaimer">
              <p><Translate id="disclaimers" /></p>
            </div>
          </div>
        </div>
        <div className="pin-container slide-top">
          <div className="awesome"></div>
          <div className="pin-headline">
            <Translate id="almost-there"></Translate>
          </div>
          <div>
            <Translate id="we_just_sent_a_pin" />
          </div>
          <div id="pin-entry" className="">
            <input type="text"
              className="pin-input"
              pattern="\d*"
              maxLength={5}
              value={this.state.pin}
              onChange={ev => this.setState({ pin: ev.target.value })}
            />
            <button type="submit" className="btn click-to-win pin-btn" disabled={RDS.IsLoading(this.props.rds)}>
              <Translate id="confirm"></Translate>
            </button>
            {RDS.WhenLoading(null, () => <div />)(this.props.rds)}
          </div>
          <div className="participants-container">
            <div className="left-column history">
              <img src={history} alt="history icon" />
            </div>
            <div className="right-column">
              <h2><Translate id="latest-participants"></Translate></h2>
              <h3><Translate id="participants-minute"></Translate></h3>
            </div>
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
                <a className="click-here" onClick={() => this.props.backToStart()}>
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
                <a className="click-here" onClick={() => this.props.backToStart()}>
                    <Translate id="click_here_to_change_your_number" />
                  </a>
                </div>
              ),
              loading: () => null,
              success: () => null
            })(this.props.rds)}

          </div>
          <div className="disclaimer-2">
            <Translate id="disclaimers"></Translate>
          </div>
        </div>

      </form>
    );
  }
}


const TQStep = ({ finalUrl }: { finalUrl: string }) => (

  <div className="destination-page active">
    <div className="destination-page-bg">
      <div className="congrats-container">
        <div className="thank-you"></div>
        <div className="congrats-subtitle">
          <Translate id="participation-to-win"></Translate>
        </div>
        <div className="cash-final-title">
          <Translate id="500-cash"></Translate>
        </div>
      </div>
    </div>
  </div>
);

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "ar",
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
        <div className="">
          <div className="lang-btns">
            <button type="button" className="lang-btn"
              onClick={() => {
                if (this.state.locale === "en") {
                  this.setState({ locale: "ar" })
                  document.getElementsByTagName('html')[0].setAttribute("lang", "ar")
                } else {
                  this.setState({ locale: "en" })
                  document.getElementsByTagName('html')[0].setAttribute("lang", "en")
                }
              }}
            >{this.state.locale === "ar" ? "EN" : "عربى"}
            </button>
          </div>
        </div>
        <div id="creative">
          <div className="full-height">
            <TranslationProvider locale={this.state.locale}>

              {match({
                msisdnEntry: rds => (
                  <SimpleOpacityTransition key="msisdnEntry">
                    <MSISDNEntryStep
                      msisdn={this.state.msisdn}
                      rds={rds}
                      onEnd={msisdn => {
                        this.setState({ msisdn });
                        this.props.actions.submitMSISDN(window, null, '973' + msisdn);
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