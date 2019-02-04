import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate, injectIntl } from "./localization/index";
import CustomTesti from "../bid-win/components/CustomTesti";
import PhoneInput, { getConfig } from "ouisys-phone-input/dist/common/PhoneInput"
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
import { mockedMSISDNEntrySuccess } from "../../clients/lp-api-mo/HOC";
import { mockSuccessState } from "../../clients/mpesa/TolaHOC";

// IMAGES DECLARATION
// ok
//const imgiphone = require("./assets/images");
// const iphonexs_logo = require('./assets/images/iphonexs_logo.png')

const history = require("./assets/img/history.svg");

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Football Star Manager" //TODO: replace Unknown with your page's name
);

const MSISDNEntryStep = injectIntl(class extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
  intl: any
}> {
  state = {
    msisdn: this.props.msisdn,
    isJerseySelected: false,
    isTeamSelected: false
  };

  phoneInputRef = React.createRef<HTMLInputElement>()


  submitTeam = () => {
    this.setState({
      isTeamSelected: true
    });
  };

  selectJersey = () => {

    this.setState({
      isJerseySelected: true
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
            (this.state.isTeamSelected === true ? "active" : "")
          }

        ></div>

        <div
          className={
            "c-team-selection " +
            (this.state.isTeamSelected === false ? "active" : "")
          }
        >
          <div className="cta-lead" />
          <div className="cta-sub-lead">
            <Translate id="select-team-lead" />
          </div>

          <div className="team-cta">
            <Translate id="select-team-cta" />
          </div>

          <div className="jersey-selection">
            <input
              type="radio"
              defaultChecked={true}
              onClick={this.selectJersey}
              name="jersey"
              id="red-jersey"
            />

            <label htmlFor="red-jersey" className="jersey">
              <div className="jersey-red" />

            </label>

            <input
              type="radio"
              onClick={this.selectJersey}
              name="jersey"
              id="blue-jersey"
            />

            <label htmlFor="blue-jersey" className="jersey">
              <div className="jersey-blue" />

            </label>

            <input
              type="radio"
              onClick={this.selectJersey}
              name="jersey"
              id="yellow-jersey"
            />

            <label onClick={this.selectTeam} htmlFor="yellow-jersey" className="jersey">
              <div className="jersey-yellow" />

            </label>
          </div>

          <button
            onClick={this.submitTeam}
            type="button"
            className="btn enabled ">
            <Translate id="submit-team-btn" />

          </button>

          <div className="testimonials">
            <CustomTesti
              className="frontline-testimonials"
              testimonials={
                [
                  {
                    Message: () => <span className="message"><Translate id="testi1" /></span>,
                    Name: () => <span> -Hashem</span>,
                    stars: 5
                  },
                  {
                    Message: () => <span className="message"><Translate id="testi2" /></span>,
                    Name: () => <span> -Suleiman</span>,
                    stars: 4
                  },
                  {
                    Message: () => <span className="message"><Translate id="testi3" /></span>,
                    Name: () => <span> -Amir</span>,
                    stars: 5
                  }
                ]
              }
            />
          </div>

        </div>
        <div
          className={
            "panel " +
            (this.state.isTeamSelected === true ? "active" : "")
          }
        >
          <div className="rays">

          </div>
          <div className="cta-lead2" />

          <div className="cta-sub-lead">
            <div className="selected-team">
              <div className="jersey-blue"></div>
            </div>
            <h1> <Translate id="selected-team-title" /></h1>
            <p><Translate id="selected-team-lead" /></p>
          </div>

          <div className="number-entry">
            <label><Translate id="msisdn-label" /></label>
            <div className="input-wrapper">
            <PhoneInput
              inputElementRef={this.phoneInputRef}
              placeholder=""
              msisdn={this.state.msisdn}
              countryCode={process.env.country}
              showFlag={false}
              showMobileIcon={true}
              showError={true}

              onChange={({ msisdn, isValid, bupperNumber }) => {

                this.setState({ msisdn, isValid, bupperNumber })
              }
              }

            />
            </div>
            <button
              className="btn enabled"
              type="submit"
              disabled={RDS.IsLoading(this.props.rds)}
            >
              <Translate id="msisdn_btn" />
            </button>
            <div className="participants-container">
            <div className="left-column history">
              <img src={history} alt="history icon" />
            </div>
            <div className="right-column">
              <h2><Translate id="latest-participants"></Translate></h2>
              <h3><Translate id="participants-minute"></Translate></h3>
            </div>
          </div>

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
});

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
          <div className="cta-lead2" />

          <div className="cta-sub-lead">
            <div className="selected-team">
              <div className="jersey-blue"></div>
            </div>
            <h1>
              <Translate id="pin-lead" />
            </h1>

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
            <button type="submit" className="btn enabled" disabled={RDS.IsLoading(this.props.rds)}>
              <Translate id="pin-submit-btn" />
            </button>
            {RDS.WhenLoading(null, () => <div />)(this.props.rds)}
          </div>

          <div className="pin-support">
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

                  <a className="change-number" onClick={() => this.props.backToStart()}>
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
                  <a className="resend-btn"><Translate id="resend-pin" /></a>
                  <a className="change-number" onClick={() => this.props.backToStart()}>
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
    <div className="overlay active"></div>
    <div className="panel active">
      <div className="rays">
      </div>
      <div className="cta-lead2" />
      <div className="cta-sub-lead">
        <div className="selected-team">
          <div className="jersey-blue"></div>
        </div>
        <h1>
          <Translate id="thank-you" />
        </h1>
      </div>
      <div className="pin-support"></div>
      <a className="btn thank-you enabled" href={finalUrl}>
        <Translate id="download-now"></Translate>
      </a>
    </div>
  </div>
);

const getDefaultLocale = () => {
  const lsLang = localStorage.getItem('locale')
  if (!!lsLang && (lsLang == 'ar' || lsLang == 'en')) {
    return lsLang
  } else {
    return ((!!navigator.languages && navigator.languages.some(lang => /ar/.test(lang))) || /ar/.test(navigator.language)) ? 'ar' : 'en'
  }
}

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: getDefaultLocale(),
    msisdn: "",

  };

  setLocale = (lang) => {
    localStorage.setItem('locale', lang)
    this.setState({ locale: lang }, () => this.setHtmlLang())
  }

  setHtmlLang = () => {
    document.getElementsByTagName('html')[0].setAttribute("lang", this.state.locale);
  }

  componentDidMount() {
    this.setHtmlLang();
  }
  render() {

    return (

      <div id="container">
        <div id="creative">
          <div className="header">
            <div className="lang-btns">
            </div>
            <div className="logo"></div>
            <div className="embelem"></div>
          </div>
          <div>
            <TranslationProvider locale={this.state.locale}>
              <div>
                <div className="language-container">


                  <button className="lang-btn"
                    onClick={() => {
                      if (this.state.locale === "en") {
                        this.setLocale('ar')
                      } else {
                        this.setLocale('en')
                      }
                    }}
                  >{
                      this.state.locale === "ar"
                        ? "EN"
                        : "عربى"
                    }</button>

                </div>

                <TransitionGroup className={simpleOpacityTransitionStyles.group}>
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
                </TransitionGroup>
              </div>
            </TranslationProvider>
          </div>
        </div>
      </div>
    );
  }
}

export default HOC(tracker, Root)(initialState);

