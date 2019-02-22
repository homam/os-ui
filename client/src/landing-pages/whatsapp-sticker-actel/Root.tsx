import * as React from "react";
import mkTracker, { queryString } from "../../pacman/record";
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
  mockedPINState,
  mockedPINSuccesState
} from "../../clients/lp-api/HOC";
import * as RDS from "../../common-types/RemoteDataState";
import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import "./assets/css/style.less?raw";
import CustomTesti from "../bid-win/components/CustomTesti";
import PhoneInput from "ouisys-phone-input/dist/common/PhoneInput/PhoneInput"; 
import Disclaimer from "../../legal-components/Disclaimer";



const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "whatsapp-sticker-actel"
);

function Wait(props) {
  return (
    <Translate id="wait_message"></Translate>
  )
}

const Monster2 = require("./assets/img/monster-whatsapp.png");
const LaughitUp = require("./assets/img/laugh.png")
const New = require("./assets/img/star.png");
const More = require("./assets/img/more.png");
const NewSm = require("./assets/img/star-sm.svg");
const Monster1 = require("./assets/img/monster-1.png");
const StickerPack = require("./assets/img/sticker-pack.png");
const HumourSticker = require("./assets/img/humour-sticker.png");
const Romance = require("./assets/img/romance.png");

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;

}> {
  state = {
    locale: "en",
    msisdn: this.props.msisdn,
    bupperNumber: this.props.msisdn,
    isValid: false,
    firstStep: 1,
    secondStep: 0,
    humour: 0,
    romance: 0,
  };
  phoneInputRef = React.createRef<HTMLInputElement>()

  showStep = () => {
    this.setState({
      firstStep: 0,
      secondStep: 0,
      humour: 1,
      romance: 0,
    })
  }

  showStep2 = () => {
    this.setState({
      firstStep: 0,
      secondStep: 1,
      humour: 0,
      romance: 1,
    })
    setTimeout(() => {
      if(!!this.phoneInputRef && !!this.phoneInputRef.current) {
        this.phoneInputRef.current.focus();
      }
    }, 100);
  }

  componentDidMount(){
  }

  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.bupperNumber);
        }}
      >
        {/* FIRST PRELANDER*/}
        <div className="bg"></div>
        <span className="top-legals"><Translate id="top-legals" /></span>
        <div className="wrapper">
        
          <div className="new">
            {/* <img src={New} /> */}
          </div>
          <div className="op-logo"></div>

          <div className="laugh-it">
            {/* <img src={LaughitUp} /> */}
          </div>
          <div className={"first-prelander " + (this.state.firstStep === 1 ? "active" : "")}>
            <div className="monster-container1">
              <img src={Monster2} />
            </div>
            <div className="monster-container">
              <div className="body-container2 body-container2--monster1">
                <div className={"monster-1 " + (this.state.firstStep === 1 ? "active" : "")}>
                  <img src={Monster1} />
                </div>
                <div className="body-copy">
                  <p><Translate id="express-yourself"></Translate></p>
                  <p><Translate id="New"></Translate> <span className="green"><Translate id="whatsapp-sticker"></Translate></span></p>
                </div>
                <p><Translate id="choose-sticker-type"></Translate></p>
                <div className="btn-wrapper">
                  <div>
                    <button type="button" className="btn" onClick={this.showStep}><Translate id="funny"></Translate></button>
                  </div>
                  <div>
                    <button type="button" className="btn" onClick={this.showStep2}><Translate id="romance"></Translate></button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MSISDN INPUT */}
          <div className={"hidden " + (this.state.firstStep === 0 ? "active" : "")}>
            <div className="monster-container">
              {/* FUNNY */}
              <div className="body-container2 body-container2--monster2">
                <div className={"humour " + (this.state.humour === 0 ? "hidden" : "")}>
                  <div className="monster-2">
                    <img src={HumourSticker} />
                  </div>
                  <div className="space1"></div>
                  <div className="title">
                    <Translate id="sense-of-humour"></Translate>
                  </div>
                </div>
                {/* ROMANCE */}
                <div className={"romantic " + (this.state.romance === 0 ? "hidden" : "")}>
                  <div className="monster-2 monster-2--md">
                    <img src={Romance} />
                  </div>
                  <div className="space1"></div>
                  <div className="title">
                    <Translate id="so-romantic"></Translate>
                  </div>
                </div>
                <p>
                  <Translate id="enter-phone-number"></Translate>
                </p>
                <div className="whatsapp-input">
                  <PhoneInput
                    msisdn={this.state.msisdn}
                    countryCode={process.env.country}
                    showFlag={!true}
                    showMobileIcon={true}
                    showError={false}
                    placeholder=""
                    inputElementRef={this.phoneInputRef}
                    onChange={params => {
                      console.log(params)
                      this.setState({ msisdn: params.msisdn, isValid: params.isValid, bupperNumber: params.bupperNumber })
                    }} 
                  />
                  <div>
                    
                    
                    
                  </div>
                </div>

                <button className="btn" type="submit" 
                  disabled={!this.state.isValid || RDS.IsLoading(this.props.rds)}><Translate id="submit-to-subscribe"></Translate></button>
                {RDS.WhenLoading(null, () => <Wait />)(this.props.rds)}
                <div className="error-msg">
                  {RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)}
                </div>
                <span ><Translate id="phone-legals" /></span>

                <a href="https://www.google.com/" className="exit-btn"><Translate id="exit" /></a>
                {/* MSISDN END HERE*/}
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="more">
            <div className="new-sm">
              {/* <img src={NewSm} /> */}
            </div>
            <img src={More} />
          </div>
          <div className="whatsapp-testimonial">
            <CustomTesti
              className="whatsapp-sticker"
              testimonials={
                [
                  {
                    Message: () => <span className="message"><Translate id="testimonial-1"></Translate></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="faris"></Translate></span>,
                    stars: 5
                  },
                  {
                    Message: () => <span className="message"><Translate id="testimonial-2"></Translate></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="layla"></Translate></span>,
                    stars: 5
                  },
                  {
                    Message: () => <span className="message"><Translate id="testimonial-3"></Translate></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="ismail"></Translate></span>,
                    stars: 5
                  }
                ]
              }
            />
          </div>
          <div className="disclaimer">
            {/* <Disclaimer /> */}
            <div>
              <Translate id="disclaimers" />
            </div>
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
  pinInputRef = React.createRef<HTMLInputElement>()
  componentDidMount() {
    if(!!this.pinInputRef.current)
      this.pinInputRef.current.focus();
  }
  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.pin);
        }}
      >
        {/* PIN FLOW */}
        <div className="bg"></div>
        <span className="top-legals"><Translate id="top-legals" /></span>

        <div className="wrapper">
          <div className="new">
            {/* <img src={New} /> */}
          </div>
          <div className="op-logo"></div>

          <div className="laugh-it">
            {/* <img src={LaughitUp} /> */}
          </div>
          <div className="monster-container sticker-ready">
            <div className="body-container2">
              <div className="monster-2 sticker-pack">
                <img src={StickerPack} />
              </div>
              <div className="title">
                <Translate id="sticker-pack"></Translate>
            </div>
              <div className="pin-title">
                <Translate id="we_just_sent_a_pin" />
              </div>
              <div>
                <input id="pin-entry"
                  className="pin-input"
                  pattern="\d*"
                  maxLength={4}
                  value={this.state.pin}
                  onChange={ev => this.setState({ pin: ev.target.value })}
                  ref={this.pinInputRef}
                />
                <button className="btn" type="submit" disabled={RDS.IsLoading(this.props.rds)}><Translate id="confirm"></Translate></button>
                {RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)}
              </div>

              {
                RDS.match({
                  failure: (err: PINEntryFailure) => (
                    <div>
                      <div><Translate id={err.errorType} /></div>
                      <Translate id="if_not_your_mobile" values={{
                        phone: this.props.msisdn
                      }} />&nbsp;
                      <a href="javascript: void 0" onClick={() => this.props.backToStart()}>
                        <Translate id="click_here_to_change_your_number" />
                      </a>
                    </div>
                  ),
                  nothingYet: () => (
                    <div>
                      <Translate id="didnt_receive_pin_yet" values={{
                        phone: this.props.msisdn
                      }} />&nbsp;
                      <a className="link" href="javascript: void 0" onClick={() => this.props.backToStart()}>
                        <Translate id="click_here_to_change_your_number" />
                      </a>
                    </div>
                  ),
                  loading: () => null,
                  success: () => null
                })(this.props.rds)
              }
            </div>
          </div>
          <div className="more">
            <div className="new-sm">
              {/* <img src={NewSm} /> */}
            </div>
            <img src={More} />
          </div>
          <div className="whatsapp-testimonial">
            <CustomTesti
              className="whatsapp-sticker"
              testimonials={
                [
                  {
                    Message: () => <span className="message"><Translate id="testimonial-1"></Translate></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="faris"></Translate></span>,
                    stars: 5
                  },
                  {
                    Message: () => <span className="message"><Translate id="testimonial-2"></Translate></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="layla"></Translate></span>,
                    stars: 5
                  },
                  {
                    Message: () => <span className="message"><Translate id="testimonial-3"></Translate></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="ismail"></Translate></span>,
                    stars: 5
                  }
                ]
              }
            />
          </div>
          <div className="disclaimer">
            <p><Translate id="disclaimers" /></p>
          </div>
        </div>
      </form>
    );
  }
}

class TQStep extends React.PureComponent<{ finalUrl: string }> {

  componentDidMount() {
    setTimeout(() => {
      window.location.href = this.props.finalUrl
    }, 2000);
  }

  render() {
    return (
      <div>
        <div className="bg"></div>
        <span className="top-legals"><Translate id="top-legals" /></span>

        <div className="wrapper">
          <div className="new">
            {/* <img src={New} /> */}
          </div>
          <div className="op-logo"></div>

          <div className="laugh-it">
            {/* <img src={LaughitUp} /> */}
          </div>

          <div className="monster-container sticker-ready">
            <div className="body-container2 custom-height">
              <div className="monster-2">
                <img src={HumourSticker} />
              </div>
              <div className="space1"></div>
              <div className="title"><Translate id="thank-you"></Translate></div>
              <div><Translate id="express-emotions"></Translate></div>
              {/* <a className="btn" href={finalUrl}><Translate id="download-now"></Translate></a> */}
            </div>
          </div>
          <div className="space2"></div>
          <div className="disclaimer">
            <Disclaimer/>
          </div>
        </div>
      </div>
    );
  }
}


class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: typeof window == "undefined" ? 'en' : queryString(window.location.search, "locale") || 'ar',
    msisdn: "",
  };

  defaultLang = () => {
    document.getElementsByTagName('html')[0].setAttribute("lang", this.state.locale);
  }

  componentDidMount() {
    this.defaultLang();
  }

  render() {
    return (
      <div>
        <TranslationProvider locale={this.state.locale}>
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
              pinEntry: rds => RDS.WhenSuccess((
                <SimpleOpacityTransition key="pinEntry">
                  <PINEntryStep
                    onEnd={pin => this.props.actions.submitPIN(pin)}
                    backToStart={() => this.props.actions.backToStart()}
                    msisdn={this.state.msisdn}
                    rds={rds}
                  />
                </SimpleOpacityTransition>
              ), ({ finalUrl }) => <TQStep finalUrl={finalUrl} />)(rds),
              completed: ({ finalUrl }) => (
                <SimpleOpacityTransition key="completed">
                  <TQStep finalUrl={finalUrl} />
                </SimpleOpacityTransition>
              )
            })(this.props.currentState)}
          </TransitionGroup>
        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);