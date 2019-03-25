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
  mockedPINState,
} from "../../clients/lp-api/HOC";
import * as RDS from "../../common-types/RemoteDataState";
import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import PhoneInput, { getConfig } from "ouisys-phone-input/dist/common/PhoneInput";
import Disclaimer from "../../legal-components/Disclaimer";


import "./assets/css/style.less?raw";
import CustomTesti from "../bid-win/components/CustomTesti";
import { mockFailureState, mockLoadingState } from "../../clients/mpesa/TolaHOC";
import { mockedSuccessState } from "../../clients/bupper-click2sms/HOC";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Personalised Funny Video"
);

const rating = require("./assets/img/rating.svg");
const like = require("./assets/img/eye.svg");

function Wait(props) {
  return (
    <div>
      <Translate id="wait" />
    </div>
  )
}

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn
  };

  phoneInputRef = React.createRef<HTMLInputElement>()
  ref_rockman_id = React.createRef<HTMLInputElement>();
  ref_no_js_form_submission = React.createRef<HTMLInputElement>();


  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.msisdn);
        }}
      >

<input type="hidden" name="rockman_id" ref={this.ref_rockman_id} />
      <input type="hidden" name="no_js_form_submission" value="true" ref={this.ref_no_js_form_submission} />

        <div className="input-wrapper custom-top">
          <div className="input-container">
            <div><Translate id="your-video-ready" /><br></br>
              <span className="bold"><Translate id="enter-your-phone-number" /></span>
            </div>

            <div className="phone-container">
              <PhoneInput
                inputElementRef={this.phoneInputRef}
                placeholder="Phone number"
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
              <button type="submit" className="btn btn-sms uppercase" disabled={RDS.IsLoading(this.props.rds)}><Translate id="submit" /></button>
              {
                RDS.WhenLoading(null, () => <Wait />)(this.props.rds)
              }
              <div className="error-msg">
                {
                  RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)
                }
              </div>
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
  locale: string,
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

        <div className={"funny-guy-2 funny-guy-pin " + (this.props.locale === "th" ? " funny-guy-pin-th" : "")}></div>
        <div className="masthead-container">
          <div className={"ribbon " + (this.props.locale === "th" ? " ribbon-th" : "")}></div>
          <div className={"headline " + (this.props.locale === "th" ? " headline-th" : "")}></div>
          <div className="hand-container">
            <div className="hand-wrapper top31">
              <div className="hand vibrate-2"></div>
            </div>
          </div>
        </div>

        <div className="input-wrapper custom-top">
          <div className="input-container">
            <div>
              <Translate id="we_just_sent_a_pin" />
            </div>
            <div className="pin-input">
              <input
                placeholder="PIN"
                value={this.state.pin}
                onChange={ev => this.setState({ pin: ev.target.value })}
              />
              <button type="submit" className="btn btn-sms" disabled={RDS.IsLoading(this.props.rds)}><Translate id="confirm" /></button>
              {
                RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
              }
            </div>
            <div>
              {
                RDS.match({
                  failure: (err: PINEntryFailure) => (
                    <div>
                      <div><Translate id={err.errorType} /></div>
                      <Translate id="if_not_your_mobile" values={{
                        phone: this.props.msisdn
                      }} />&nbsp;
                  <a onClick={() => this.props.backToStart()}>
                        <Translate id="click_here_to_change_your_number" />
                      </a>
                    </div>
                  ),
                  nothingYet: () => (
                    <div>
                      <Translate id="didnt_receive_pin_yet" values={{
                        phone: this.props.msisdn
                      }} />&nbsp;
                  <a onClick={() => this.props.backToStart()}>
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
        </div>
      </form>
    );
  }
}

const TQStep = ({ finalUrl, locale }: { finalUrl: string, locale:string }) => <div>

<div className={"funny-guy-2 funny-guy-pin " + (locale === "th" ? "funny-guy-pin-th" : "")}></div>
        <div className="masthead-container">
          <div className={"ribbon " + (locale === "th" ? "ribbon-th" : "")}></div>
          <div className={"headline " + (locale === "th" ? "headline-th" : "")}></div>
          <div className="hand-container">
            <div className="hand-wrapper top31">
              <div className="hand vibrate-2"></div>
            </div>
          </div>
        </div>

  <div className="input-wrapper custom-top">
    <div className="input-container">
      <h3><Translate id="thank-you" /></h3>
      <div className="sub-title"><Translate id="enjoy-full-access" /></div>
      <div className="btn-container">
      <a className="btn btn-sms" href={finalUrl}><Translate id="access-now" /></a>
      </div>
    </div>
  </div>
</div>;

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "th",
    msisdn: getConfig(process.env.country).commonPrefix,
    preLander: 1,
    rangeValue: "1",
    faceImage:"sad",
    humourImage: "humour-1"
  };

  nextPrelander = () => {
    this.setState({
      preLander: this.state.preLander + 1
    });

  };

  showLoading = () => {
    this.setState({
      preLander: this.state.preLander + 1
    });
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        elem.style.display = 'none';
        // document.getElementById("hideLoading").className = "active";
        document.getElementById("loading-page").className = "hidden";
        document.getElementById("hide-bg").className = "hidden";
      } else {
        width++;
        elem.style.width = width + '%';
      }
    }
  };

  switchImage(val){
    //var myVal = parseInt(val)
    switch (true) {
      case (val < 30):
         this.setState({
           faceImage:"sad"
         })
        break;
      case (val < 65 && val > 30):
        this.setState({
          faceImage:"normal"
        })
        break;
      case (val > 65):
        this.setState({
          faceImage:"happy"
        })
    }
  }

  switchImage2(val){
    //var myVal = parseInt(val)
    switch (true) {
      case (val < 30):
         this.setState({
           humourImage:"humour-1"
         })
        break;
      case (val < 65 && val > 30):
        this.setState({
          humourImage:"humour-2"
        })
        break;
      case (val > 65):
        this.setState({
          humourImage:"humour-3"
        })
    }
  }

  render() {
    return (
    <TranslationProvider locale={this.state.locale}>
      <div>

        <div id="hide-bg" className={"prelander black-bg " + (this.state.preLander === 5 ? "active" : "hidden")}></div>
        {/* 5th PRELANDER */}
        <div id="loading-page" className={"prelander " + (this.state.preLander === 5 ? "active" : "hidden")}>
          <div className="loading-title uppercase">
            <Translate id="searching" />
              </div>
          <div id="myProgress">
            <div id="myBar"></div>
          </div>
        </div>


        <div className={"hidden overlay " + ((this.state.preLander === 2 || this.state.preLander === 3 || this.state.preLander === 4) ? "active" : "")}></div>


        <div className="bg-wrapper">

          <div className="container">
            <div className="topbar">
              <div className="rating">
                <img src={rating} />
              </div>
              <div className="likes">
                <img src={like} /> <span className="bold blue"><Translate id="340k" /></span> &nbsp;<Translate id="like-this-page" />
              </div>
            </div>


            <TransitionGroup>
              {match({
                msisdnEntry: rds => (

                  <div>
                    <div className={"vibrate-2 " + ((this.state.preLander === 1 || this.state.preLander === 2 || this.state.preLander === 3 || this.state.preLander === 4) ? "active" : "hidden")}>
                      <div className={"funny-guy " + (this.state.locale === "th" ? "funny-guy-th" : "")}></div>
                    </div>

                    <div className={"hidden funny-guy-2 funny-guy-msisdn " + (this.state.preLander === 5 ? "active" : "") + (this.state.locale === "th" ? " funny-guy-msisdn-th" : "")}></div>


                    <div className="masthead-container">
                      <div className={"ribbon " + (this.state.locale === "th" ? "ribbon-th" : "")}></div>
                      <div className={"headline " + (this.state.locale === "th" ? "headline-th" : "")}></div>
                    </div>

                    {/* PRELANDER 1 */}
                    <div className={"prelander " + (this.state.preLander === 1 ? "active" : "hidden")}>

                      <div className="btn-container">
                        <button type="button" className="btn" onClick={this.nextPrelander}><Translate id="start" /></button>
                      </div>
                    </div>


                    {/* PRELANDER 2 */}
                    <div className={"prelander faces-wrapper " + (this.state.preLander === 2 ? "active" : "hidden")}>

                      <div className="masthead-container">
                        <div id="faceDefault" className={`faces shake-bottom ${this.state.faceImage}` + (this.state.locale === "th" ? " faces-th" : "")}></div>
                        <div className="input-wrapper send-to-front">
                          <div className="input-container">
                            <div className="title"><Translate id="tell-mood" /></div>

                            <div className="slidecontainer">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={this.state.rangeValue}
                                className="slider"
                                id="myRange"
                                ref="rangeSlider"
                                onChange={(ev)=>{
                                  this.switchImage(ev.target.value);
                                  this.setState({
                                    rangeValue:ev.target.value
                                  });
                                  
                                }}
                              />
                            </div>


                            <div className="btn-container">
                              <button type="button" className="btn sm" onClick={this.nextPrelander}><Translate id="next" /></button>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PRELANDER 3 */}
                    <div className={"prelander faces-wrapper " + (this.state.preLander === 3 ? "active" : "hidden")}>

                      <div className="masthead-container">
                        <div className={`faces shake-bottom ${this.state.humourImage}` + (this.state.locale === "th" ? " faces-th" : "")}></div>
                        <div className="input-wrapper send-to-front">
                          <div className="input-container">
                            <div className="title"><Translate id="tell-us-humour" /></div>

                            <div className="slidecontainer">
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={this.state.rangeValue}
                                className="slider"
                                id="myRange"
                                ref="rangeSlider"
                                onChange={(ev) => {
                                  this.switchImage2(ev.target.value);
                                  this.setState({
                                    rangeValue: ev.target.value
                                  });

                                }}
                              />
                            </div>
                            <div className="btn-container">
                              <button type="button" className="btn sm" onClick={this.nextPrelander}><Translate id="next" /></button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PRELANDER 4 */}
                    <div className={"prelander faces-wrapper " + (this.state.preLander === 4 ? "active" : "hidden")}>

                      <div className="masthead-container">
                        <div className="input-wrapper send-to-front">
                          <div className="input-container">
                            <div className="title"><Translate id="please-select" /></div>
                            <div className="icons-wrapper slide-in-elliptic-top-fwd">

                              <div className="icons-container">
                                <input type="checkbox" value="icon-1" name="icon-1" id="icon-1" />
                                <label htmlFor="icon-1" className="bra"></label>
                              </div>
                              <div className="icons-container">
                                <input type="checkbox" value="icon-2" name="icon-2" id="icon-2" />
                                <label htmlFor="icon-2" className="baby"></label>
                              </div>
                              <div className="icons-container">
                                <input type="checkbox" value="icon-3" name="icon-3" id="icon-3" />
                                <label htmlFor="icon-3" className="chicken"></label>
                              </div>

                            </div>


                            <div className="icons-wrapper slide-in-elliptic-top-fwd">

                              <div className="icons-container">
                                <input type="checkbox" value="icon-4" name="icon-4" id="icon-4" />
                                <label htmlFor="icon-4" className="ball"></label>
                              </div>
                              <div className="icons-container">
                                <input type="checkbox" value="icon-5" name="icon-5" id="icon-5" />
                                <label htmlFor="icon-5" className="cat"></label>
                              </div>
                              <div className="icons-container">
                                <input type="checkbox" value="icon-6" name="icon-6" id="icon-6" />
                                <label htmlFor="icon-6" className="burger"></label>
                              </div>

                            </div>

                            <div className="btn-container">
                              <button type="button" className="btn sm" onClick={this.showLoading}><Translate id="search" /></button>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* MSISDN */}
                    <div className={"prelander " + (this.state.preLander === 5 ? "active" : "hidden")}>

                      <div className="hand-wrapper">
                        <div className="hand vibrate-2"></div>
                      </div>

                      <MSISDNEntryStep
                        msisdn={this.state.msisdn}
                        rds={rds}
                        onEnd={msisdn => {
                          this.setState({ msisdn });
                          this.props.actions.submitMSISDN(
                            window,
                            null,
                            msisdn
                          );
                        }}
                      />
                    </div>
                  </div>
                ),


                pinEntry: rds => (

                  <SimpleOpacityTransition key="pinEntry">
                    <div>

                      <PINEntryStep
                        onEnd={pin => this.props.actions.submitPIN(pin)}
                        locale={this.state.locale}
                        backToStart={() =>
                          this.props.actions.backToStart()
                        }
                        msisdn={this.state.msisdn}
                        rds={rds}
                      /> </div>
                  </SimpleOpacityTransition>

                ),
                completed: ({ finalUrl }) => (
                  <SimpleOpacityTransition key="completed">
                    <TQStep 
                    finalUrl={finalUrl} 
                    locale={this.state.locale}
                    />
                  </SimpleOpacityTransition>
                )
              })(this.props.currentState)}
            </TransitionGroup>

          </div>

          <CustomTesti
            className="funny-video-testimonial"
            testimonials={
              [
                {
                  Message: () => <span className="message"><Translate id="testimonial-1" /></span>,
                  Name: () => <span className="testimonials-name"> - <Translate id="testimonial-name-1" /></span>,
                  stars: 5
                },
                {
                  Message: () => <span className="message"><Translate id="testimonial-2" /></span>,
                  Name: () => <span className="testimonials-name"> - <Translate id="testimonial-name-2" /></span>,
                  stars: 5
                },
                {
                  Message: () => <span className="message"><Translate id="testimonial-3" /></span>,
                  Name: () => <span className="testimonials-name"> - <Translate id="testimonial-name-3" /></span>,
                  stars: 5
                }
              ]
            }
          />
          <div className="funny-video-disclaimer">
          <Translate id="disclaimer" />
        </div>
        </div>

      </div>
    </TranslationProvider>
    );
  }
}
export default HOC(tracker, Root)(initialState);