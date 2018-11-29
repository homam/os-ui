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
import CustomTesti from "../bid-win/components/CustomTesti";
import Disclaimer from "../../legal-components/Disclaimer";
import TimerComponent from '../../common-components/timer/timer';
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

function Terms(props) {
  return (
    <div className="disclaimer">
    <p><Translate id="disclaimers" /></p>
    </div>
  );
}

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn,
    isModelSelected: false
  };


  selectModel = () => {
    this.setState({
      isModelSelected: true
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

        <div className={
          "overlay " +
          (this.state.isModelSelected === true ? "active" : "")
        }

        ></div>


        <div className={
          "select-model " +
          (this.state.isModelSelected === false ? "active" : "")}>

          <h2><Translate id="stand_chance" /></h2>
          <h1><Translate id="win_an" /> <br />iPhone X <span>S</span></h1>

       { /*   <h2>Hurry this excluasive offer expiers in</h2>

       */}

  
          <div className="model-wraper">
          <div className="select-model-lead"> <Translate id="you_have"/> <TimerComponent timerDuration={30} /> <Translate id="to_participate" /> </div>
          <h3><Translate id="choose_model"/></h3>

            <button type="button" className="model btn" onClick={this.selectModel}>

              <span>iphonex s Max</span>

            </button>

            <button type="button" className="model btn" onClick={this.selectModel}>

              <span>iphonex s</span>

            </button>
          </div>
          <div className="winners">

            <label><Translate id="recent_winners" /></label>

            <CustomTesti
              testimonials={
                [
                  {
                    Message: () => <span className="message"><Translate id="testi_1"/></span>,
                    Name: () => <span className="testimonials-name"> -<Translate id="testi_name1"/></span>,
                    stars: 5
                  },
                  {
                    Message: () => <span className="message"><Translate id="testi_2"/></span>,
                    Name: () => <span className="testimonials-name"> -<Translate id="testi_name2"/></span>,
                    stars: 4
                  },
                  {
                    Message: () => <span className="message"> <Translate id="testi_3"/></span>,
                    Name: () => <span className="testimonials-name"> -<Translate id="testi_name3"/></span>,
                    stars: 5
                  }
                ]
              }
            />

          </div>

          <Terms />

          

        </div>




        <div
          className={
            "panel " +
            (this.state.isModelSelected === true ? "active" : "")}>

          <div className="rays" />

          <div className="centerpiece">
          <span>iphone X <em>S</em></span>
          </div>

          <div className="panel-lead"><Translate id="congratulations" />
          <small><Translate id="you_are_close"/></small>
          </div>
          <div className="number-entry">
          
            <label><Translate id="msisdn_label" /></label>
            <div className="input-wrapper">
              <input
                placeholder="Phone number"
                value={this.state.msisdn}
                onChange={ev => this.setState({ msisdn: ev.target.value })}
              />
            </div>
            <button
              className="btn primary"
              type="submit"
              disabled={RDS.IsLoading(this.props.rds)}
            >
              <Translate id="msisdn_btn" />
                </button>

            {RDS.WhenLoading(null, () => "Wait...")(this.props.rds)}
          </div>
          <Terms />
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


          <div className="lead-text">
          <h3>
            <Translate id="hurry_slot" />
            </h3>
            <p>
            <Translate id="we_just_sent_a_pin" />
            <a onClick={() => this.props.backToStart() }>
            <Translate id="wrong_number" />
                  </a>
                  </p>
            
          </div>

          <div id="pin-entry">
          <label><Translate id="pin_label" /></label>
            <input
              placeholder="PIN"
              className="pin-input"
              value={this.state.pin}
              onChange={ev => this.setState({ pin: ev.target.value })}
            />
            <button type="submit" className="btn primary" disabled={RDS.IsLoading(this.props.rds)}>
              <Translate id="pin_submit_btn" />
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
               
                </div>
              ),
              nothingYet: () => (
                <div>
                  {/*<Translate
                    id="didnt_receive_pin_yet"
                    values={{
                      phone: this.props.msisdn
                    }}
                  /> 
                  &nbsp;
                <a onClick={() => this.props.backToStart()}>
                    <Translate id="click_here_to_change_your_number" />
                  </a>
                  */}
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
  <div className="tq-msg">
     
    <h2> <Translate id="congrats"/></h2>
    
    <p><Translate id="entry_accepted" /></p>
  

    <a href={finalUrl}>Click here to access the product</a>
  </div>
);

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
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
      
      <div className="ar-top-legals">Gameloards أهلا بك في خدمة</div>
      <div className="en-top-legals">Welcome to Gameloards</div>
        <div className="header">

          <div className="lang-btns">

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

export default HOC(tracker, Root)(mockedPINState);

