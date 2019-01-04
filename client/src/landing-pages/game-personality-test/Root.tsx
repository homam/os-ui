import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {
  initialState,
  mockedCompletedState,
  HOCProps,
  MSISDNEntryFailure,
  MSISDNEntrySuccess,
  match,
  MOLink
} from "../../clients/lp-api-mo/HOC";
import * as RDS from "../../common-types/RemoteDataState";
import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import { IKeywordShortcode } from "../../clients/lp-api-mo/main";

import "./assets/css/style.less?raw";
import CustomTesti from "../bid-win/components/CustomTesti";
import { element } from "prop-types";
import MsisdnComponent from '../../common-components/msisdn/msisdn-input';
import { mockedPINState } from "../../clients/lp-api/HOC";

const thankyou = require("./assets/img/black-panther.png");
const rating = require("./assets/img/rating.png");
const knight = require("./assets/img/knight.svg");
const guardian = require("./assets/img/shield.svg");
const hunter = require("./assets/img/eye.png");



const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Personality Game"
);

const MO = ({ keyword, shortcode }: IKeywordShortcode) => {
  return <div className="mo-wrapper">
    <div className="title-sm space">
      Send SMS to confirm your phone number
    </div>
    <MOLink keywordAndShortcode={{ keyword, shortcode }}>
      <button type="button" className="btn primary">SMS Now</button>
      <div className="normal-text">- OR -</div>
      <div className="mo-text">
        Send <span className="keyword">{keyword}</span> to <span className="shortcode">{shortcode} </span>
      </div>
    </MOLink>
    {/* <div>
      <a className="try-again" onClick={() => backToStart()}>Try again</a>
    </div> */}
  </div>
}

// THANK YOU PAGE START
const TQStep = ({ finalUrl }: { finalUrl: string }) => <div className="tq-msg">
  <div className="bg">
    <div className="starburst"></div>
    <div className="wrapper">
      <div className="title">
        YOU ARE A <span className="yellow-lg">WARRIOR</span>
      </div>
      <div className="img-wrapper">
        <img src={thankyou}></img>
      </div>
      {/* <a href={finalUrl} className="btn primary">Access Product</a> */}
      <div className="text-container">
        You possess strong acrobatics and hand-to-hand combat skills with unique hybrid fighting style.
  </div>
      <div className="disclaimer">
        <Translate id="disclaimer"></Translate>
      </div>
    </div>
  </div>
</div>;
// THANK YOU PAGE END

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    locale: "en",
    msisdn: this.props.msisdn,
    preLander1: 1,
    preLander2: 0,
    preLander3: 0,
    preLander4: 0,
    loadingPage: 0,
    showMsisdn: 0,
    showMOpage: 0,
    showBlackBg: 0,
  };

  showPrelander2 = () => {
    this.setState({
      preLander1: 0,
      preLander2: 1,
      preLander3: 0,
      preLander4: 0,
      loadingPage: 0,
      showMsisdn: 0,
      showMOpage: 0
    })
  }

  showPrelander3 = () => {
    this.setState({
      preLander1: 0,
      preLander2: 0,
      preLander3: 1,
      preLander4: 0,
      loadingPage: 0,
      showMsisdn: 0,
      showMOpage: 0
    })
  }

  showPrelander4 = () => {
    this.setState({
      preLander1: 0,
      preLander2: 0,
      preLander3: 0,
      preLander4: 1,
      loadingPage: 0,
      showMOpage: 0,
      showMsisdn: 0
    })
  }

  showLoading = () => {
    this.setState({
      preLander1: 0,
      preLander2: 0,
      preLander3: 0,
      preLander4: 0,
      loadingPage: 1,
      showMOpage: 0,
      showBlackBg: 1,
      showMsisdn: 0
    })
    var elem = document.getElementById("myBar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        elem.style.display = 'none';
        document.getElementById("hideLoading").className = "active";
        document.getElementById("showMsisdn-2").className = "hidden";
        document.getElementById("hide-bg").className = "hidden";
      } else {
        width++;
        elem.style.width = width + '%';
      }
    }
  }

  showMsisdn = () => {
    this.setState({
      preLander1: 0,
      preLander2: 0,
      preLander3: 0,
      preLander4: 0,
      loadingPage: 0,
      showMsisdn: 1,
      showMOpage: 0,
      showBlackBg: 0
    })
  }

  showMO = () => {
    this.setState({
      preLander1: 0,
      preLander2: 0,
      preLander3: 0,
      preLander4: 0,
      loadingPage: 0,
      showMsisdn: 1,
      showMOpage: 1
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
        <div className="bg">
          <div className="rating-img">
            <img src={rating}></img>
          </div>
          <div className="starburst"></div>
          <div id="hide-bg" className={"black-bg " + (this.state.showBlackBg === 1 ? "active" : "hidden")}></div>
          <div className="wrapper">
            {/* 1st Prelander */}
            <div className={"first-prelander " + (this.state.preLander1 === 1 ? "active" : "")}>
              <div className="masthead"></div>
              <div className="content-container">
                <div className="title">
                  Take this SHORT test and find out!
              </div>
                <div className="ribbon title">
                  <span className="alert">BONUS:</span> Receive your personalised game
              </div>
                <button className="btn" type="button" onClick={this.showPrelander2}>Start your test now!</button>
              </div>
            </div>

            {/* 2nd Prelander */}
            <div className={"second-prelander " + (this.state.preLander2 === 1 ? "active" : "")}>
              <div className="masthead sm"></div>
              <div className="title">
                1. What name sounds more like you?
              </div>
              <div className="btn-container">
                <button className="btn space-1" type="button" onClick={this.showPrelander3}>
                  <div className="icons-img">Death Knight</div>
                </button>
                <button className="btn space-1" type="button" onClick={this.showPrelander3}>
                  <div className="icons-img-2">Guardian</div>
                </button>
                <button className="btn space-1" type="button" onClick={this.showPrelander3}>
                  <div className="icons-img-3">Wild Hunter</div>
                </button>
              </div>
            </div>

            {/* 3rd Prelander */}
            <div className={"third-prelander " + (this.state.preLander3 === 1 ? "active" : "")}>
              <div className="masthead sm"></div>
              <div className="title">
                2. What’s your favourite style of gameplay?
              </div>
              <div className="btn-container">
                <button className="btn space-1" type="button" onClick={this.showPrelander4}>
                  <div className="icons-img-4">Action</div>
                </button>
                <button className="btn space-1" type="button" onClick={this.showPrelander4}>
                  <div className="icons-img-5">Strategy</div>
                </button>
                <button className="btn space-1" type="button" onClick={this.showPrelander4}>
                  <div className="icons-img-6">Fighting</div>
                </button>
              </div>
            </div>

            {/* 4th Prelander */}
            <div className={"fourth-prelander " + (this.state.preLander4 === 1 ? "active" : "")}>
              <div className="masthead sm"></div>
              <div className="title">
                3. What superpower would you rather have?
              </div>
              <div className="btn-container">
                <button className="btn space-1" type="button" onClick={this.showLoading}>
                  <div className="icons-img-7">Telepathy</div>
                </button>
                <button className="btn space-1" type="button" onClick={this.showLoading}>
                  <div className="icons-img-8">Super Strength</div>
                </button>
                <button className="btn space-1" type="button" onClick={this.showLoading}>
                  <div className="icons-img-9">Speed</div>
                </button>
              </div>
            </div>

            {/* 5th Prelander */}
            <div id="showMsisdn-2" className={"fifth-prelander " + (this.state.loadingPage === 1 ? "active" : "")}>
              <div className="masthead sm"></div>
              <div className="title">
                We are building your character
              </div>
              <div id="myProgress">
                <div id="myBar"></div>
              </div>
            </div>



            {/* MSISDN INPUT START */}
            <div id="hideLoading" className={"msisdn-wrapper hidden " + (this.state.showMsisdn === 1 ? "active" : "")}>
              <div className="">
                <div className="masthead sm"></div>
                <div className="title lg">
                  Your CHARACTER is READY!
            </div>
                <div className="btn-container">
                  <div className="phone-text">
                    Enter your phone number to see your game character in action:
            </div>
                  {/* <input
                placeholder="Phone number"
                value={this.state.msisdn}
                onChange={ev => this.setState({ msisdn: ev.target.value })}
              /> */}
                  <div className="game-input">
                    <MsisdnComponent
                      msisdn={this.state.msisdn}
                      onChange={msisdn => this.setState({ msisdn: msisdn })}
                      maxLength={11}
                      countryCode="+60"
                      placeholder="Phone Number"
                    />
                  </div>

                  {/* <button type="button" className="btn" onClick={this.showMO} >
                    ACCESS MY CHARACTER NOW
                  </button> */}
                  <button className="btn" type="submit" disabled={RDS.IsLoading(this.props.rds)}>
                    ACCESS MY CHARACTER NOW
                  </button>
                  {
                    RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
                  }
                  <div className="error-msg">
                    {
                      RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)
                    }
                  </div>
                </div>
                {/* MSISDN INPUT END */}

              </div>
            </div>

            <div className={"mo-page " + (this.state.showMOpage == 1 ? "active" : "")}>
              <div className="">
                <div className="masthead sm"></div>
                <div className="title lg">
                  FINAL STEP!
            </div>
                <div className="instruction">
                  Your result is about to be sent to<br></br>60111-678-987
            </div>
                <div className="btn-container">
                  <MO keyword="GAMEZ" shortcode="3570"></MO>
                </div>
              </div>
            </div>
            <div className="game-testimonial">
              <CustomTesti
                testimonials={
                  [
                    {
                      Message: () => <span className="message"><Translate id="testi_1" /></span>,
                      Name: () => <span className="Ahmed"> - <Translate id="testi_name1" /></span>,
                      stars: 5
                    },
                    {
                      Message: () => <span className="message"><Translate id="testi_2" /></span>,
                      Name: () => <span className="testimonials-name"> - <Translate id="testi_name2" /></span>,
                      stars: 4
                    },
                    {
                      Message: () => <span className="message"><Translate id="testi_3" /></span>,
                      Name: () => <span className="testimonials-name"> - <Translate id="testi_name3" /></span>,
                      stars: 5
                    }
                  ]
                }
              />
            </div>

            <div className="disclaimer">
              <Translate id="disclaimer"></Translate>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

// class PINEntryStep extends React.PureComponent<{
//   msisdn: string;
//   rds: RDS.RemoteDataState<PINEntryFailure, PINEntrySuccess>;
//   backToStart: () => void;
//   onEnd: (pin: string) => void;
// }> {
//   state = {
//     pin: ""
//   };
//   render() {
//     return (
//       <form
//         onSubmit={ev => {
//           ev.preventDefault();
//           this.props.onEnd(this.state.pin);
//         }}
//       >
//         <div>
//           <Translate id="we_just_sent_a_pin" />
//         </div>
//         <div>
//           <input
//             placeholder="PIN"
//             value={this.state.pin}
//             onChange={ev => this.setState({ pin: ev.target.value })}
//           />
//           <button type="submit" disabled={RDS.IsLoading(this.props.rds)}>OK</button>
//           {
//             RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
//           }
//         </div>
//         <div>
//           {
//             RDS.match({
//               failure: (err: PINEntryFailure) => (
//                 <div>
//                   <div><Translate id={err.errorType} /></div>
//                   <Translate id="if_not_your_mobile" values={{
//                     phone: this.props.msisdn
//                   }} />&nbsp;
//                   <a onClick={() => this.props.backToStart()}>
//                     <Translate id="click_here_to_change_your_number" />
//                   </a>
//                 </div>
//               ),
//               nothingYet: () => (
//                 <div>
//                   <Translate id="didnt_receive_pin_yet" values={{
//                     phone: this.props.msisdn
//                   }} />&nbsp;
//                   <a onClick={() => this.props.backToStart()}>
//                     <Translate id="click_here_to_change_your_number" />
//                   </a>
//                 </div>
//               ),
//               loading: () => null,
//               success: () => null
//             })(this.props.rds)
//           }
//         </div>
//       </form>
//     );
//   }
// }

// const TQStep = ({ finalUrl }: { finalUrl: string }) => <div>
//   <h3>Thank you!</h3>
//   <a href={finalUrl}>Click here to access the product</a>
// </div>;

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    msisdn: "",
  };
  render() {
    return (
      <div>


        {/* <div></div> */}

        <TranslationProvider locale={this.state.locale}>
          <TransitionGroup className={simpleOpacityTransitionStyles.group}>
            {match({
              msisdnEntry: rds => (
                <div>
                  {
                    RDS.WhenSuccess<MSISDNEntrySuccess, JSX.Element>(<MSISDNEntryStep
                      msisdn={this.state.msisdn}
                      rds={rds}
                      onEnd={msisdn => {
                        this.setState({ msisdn });
                        this.props.actions.submitMSISDN(window, null, msisdn);
                      }}
                    />, data => <MO {...data} />)(rds)
                  }
                </div>
              ),
              completed: () => (
                <div>
                  <TQStep finalUrl={""} />
                </div>
              )
            })(this.props.currentState)}
          </TransitionGroup>
        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);