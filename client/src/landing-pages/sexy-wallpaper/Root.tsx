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
  MOLink,
  mockedMSISDNEntrySuccess
} from "../../clients/lp-api-mo/HOC";
import * as RDS from "../../common-types/RemoteDataState";
import { IKeywordShortcode } from "../../clients/lp-api-mo/main";

import {
  SimpleOpacityTransition,
  TransitionGroup,
  simpleOpacityTransitionStyles
} from "../../common-components/simple-opacity-transition";
import "./assets/css/style.less?raw";
import MsisdnInput from "../../common-components/msisdn/msisdn-input";
import CustomTesti from "../bid-win/components/CustomTesti";
import Disclaimer from "../../legal-components/Disclaimer";
import { any, string } from "prop-types";
import { PropertySignature } from "ts-simple-ast";
import {
  mockSuccessState,
  mockFailureState,
  mockLoadingState
} from "../../clients/mpesa/TolaHOC";
import { mockedPINState } from "../../clients/lp-api/HOC";
// import TQStep from "../market-survey/step-components/TQStep";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Sexy Wallpaper" //TODO: replace Unknown with your page's name
);

const rating = require("./assets/img/rating.svg");
const like = require("./assets/img/like.svg");

const MO = ({ keyword, shortcode }: IKeywordShortcode) => {
  return (
    <div>

      <div className="balloon balloon-4">
        <div className="title top-sm lg"><Translate id="sms-keep-watching" /></div>
        <div className="btn-container">
          <MO keyword="SEXY" shortcode="3678" />
        </div>
      </div>
      <div className="mo-wrapper">
        <MOLink keywordAndShortcode={{ keyword, shortcode }}>
          <div className="input-container">
            <div className="button-container">
              <button type="button" className="btn full-width both">
                <Translate id="sms-now" />
              </button>
            </div>
            <div className="mo-text"><Translate id="or" /></div>
            <div className="mo-text">
              <Translate id="send" /> <span className="keyword">{keyword}</span> to{" "}
              <span className="shortcode">{shortcode} </span>
            </div>
          </div>
        </MOLink>

        {/* <div>
      <a className="try-again" onClick={()=> backToStart()}>Try again</a>
    </div> */}

      </div>
    </div>
  );
};

const TQStep = ({ finalUrl }: { finalUrl: string }) => (
  <div>
    <div className="wrapper">
      <div className="prelander-img-1">
        <div className="img-container guy-1 vibrate-2" />
        <div className="img-container girl-1 vibrate-1" />
        <div className="balloon balloon-7">
          <div className="title-sm thank-you">
            <Translate id="thank-you" />
          </div>
        </div>
      </div>
    </div>
    {/* <a href={finalUrl}>Click here to access the product</a> */}
  </div>
);

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string; rds: RDS.RemoteDataState<MSISDNEntryFailure,
    MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn
  };

  render() {
    return (
      <form onSubmit={ev => {
        ev.preventDefault();
        this.props.onEnd(this.state.msisdn);
      }}
      >
        <div>
          {/* MSISDN START */}
          <div>
            <div className="input-container">
              <div className="sexy-wallpaper-input">
                <MsisdnInput maxLength={8} placeholder="Phone Number" onChange={msisdn => this.setState({ msisdn })}
                  countryCode={"+66"}
                />
              </div>
              <button type="submit" className="btn both full-width lg" disabled={RDS.IsLoading(this.props.rds)}>
                <Translate id="submit-to-subscribe" />
          </button>
            
            <div className="wait-container">
              {RDS.WhenLoading(null, () => "Wait...")(this.props.rds)}
            </div>
              <div className="error-msg">
                {RDS.WhenFailure(null, (err: MSISDNEntryFailure) => (
                  <Translate id={err.errorType} />
                ))(this.props.rds)}
              </div>
            </div>
          </div>
        </div>

        {/* MSISDN END */}

      </form>
    );
  }
}

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    msisdn: "",
    gender: "",
    preLander: 1
  };

  showMO = () => {
    this.setState({
      showMOpage: 1
    });
  };

  nextPrelander = () => {
    this.setState({
      preLander: this.state.preLander + 1
    });
  };

  genderFemale = () => {
    this.setState({
      gender: this.state.gender = "female"
    });

    console.log(this.state.gender);
    this.nextPrelander();
  };

  genderMale = () => {
    this.setState({
      gender: this.state.gender = "male"
    });

    console.log(this.state.gender);
    this.nextPrelander();
  };

  render() {
    return (<TranslationProvider locale={this.state.locale}>
    <div>
        <div className="wrapper">
          <div className="header">
            <div className="rating">
              <img src={rating} />
            </div>
            <div className="like">
              <img src={like} /> <span className="blue">487k <Translate id="people" /></span> <Translate id="like" />
            </div>
          </div>

          <div className="dark-bg">
            <div className="container">
              
                <div>
                  {match({
                    msisdnEntry: rds => (
                      <div>


                        
                        {/* 1ST PRELANDER */}
                        <div className={"start " + (this.state.preLander === 1 ? "active" : "hidden")}>
                          <div className="prelander-img-1">
                            <div className="img-container guy-1 vibrate-2" />
                            <div className="img-container girl-1 vibrate-1" />
                          </div>
                          <div className="balloon balloon-1">
                            <div className="title">
                              <Translate id="title" />
                            </div>
                            <div className="title-2"><Translate id="title-babe" /></div>
                            <div className="btn-container">
                              <button type="submit" className="btn male" onClick={e => this.genderMale(e)}>
                                <Translate id="male" />
                              </button>

                              <button type="submit" className="btn female" onClick={e => this.genderFemale(e)}>
                                <Translate id="female" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* 2ND PRELANDER */}
                        <div className={"prelander " + (this.state.preLander === 2 ? "active" : "hidden")}>
                          <div className={"prelander-img-1 " + (this.state.gender === "female" ? "active" : "hidden")}>
                            <div className="prelander-img-1">
                              <div className="img-container girl-2 vibrate-1" />
                            </div>
                            <div className="balloon balloon-2">
                              <div className="title-2 margin-sm">
                                <Translate id="think-hot" />
                              </div>
                              <div className="btn-container">
                                <button type="button" className="btn female full-width" onClick={this.nextPrelander}>
                                  <Translate id="of-course" />
                                </button>
                                <button type="button" className="btn female full-width" onClick={this.nextPrelander}>
                                  <Translate id="yes-babe" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className={"prelander-img-1 " + (this.state.gender === "male" ? "active" : "hidden")}>
                            <div className="img-container guy-2 vibrate-1" />

                            <div className="balloon balloon-2">
                              <div className="title-2 margin-sm">
                                <Translate id="think-hot" />
                              </div>
                              <div className="btn-container">
                                <button type="button" className="btn male full-width" onClick={this.nextPrelander}>
                                  <Translate id="of-course" />
                                </button>
                                <button type="button" className="btn male full-width" onClick={this.nextPrelander}>
                                  <Translate id="yes-babe" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* 3RD PRELANDER */}
                        <div className={"prelander " + (this.state.preLander === 3 ? "active" : "hidden")}>
                          <div className={"prelander-img-1 " + (this.state.gender === "male" ? "active" : "hidden")}>
                            <div className="img-container guy-3 vibrate-1" />
                          </div>
                          <div className="balloon balloon-3">
                            <div className="title-2 md-width margin-sm">
                              <Translate id="intense" />
                            </div>
                            <div className="btn-container">
                              <button type="button" className="btn male full-width" onClick={this.nextPrelander}>
                                <Translate id="shoulder-massage" />
                              </button>
                              <button type="button" className="btn male full-width" onClick={this.nextPrelander}>
                                <Translate id="foot-massage" />
                              </button>
                            </div>
                          </div>

                          <div className={"prelander " + (this.state.gender === "female" ? "active" : "hidden")}>
                            <div className="prelander-img-1">
                              <div className="img-container girl-3 vibrate-1" />
                            </div>
                            <div className="balloon balloon-3">
                              <div className="title-2 md-width margin-sm">
                                <Translate id="shirt-dirty" />
                              </div>
                              <div className="btn-container">
                                <button type="button" className="btn female full-width" onClick={this.nextPrelander}>
                                  <Translate id="take-off-shirt" />
                                </button>
                                <button type="button" className="btn female full-width" onClick={this.nextPrelander}>
                                  <Translate id="wash-me" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* MSISDN PAGE */}
                        <div className={"prelander " + (this.state.preLander === 4 ? "active" : "hidden")}>
                          {/* MSISDN GUY VIEW */}
                          <div className={"prelander-img-1 " + (this.state.gender === "male" ? "active" : "hidden")}>
                            <div className="img-container guy-4 vibrate-1" />
                            <div className="balloon balloon-5">
                              <div className="title-sm guy">
                                <Translate id="more-action" />
                              </div>
                            </div>
                          </div>

                          {/* MSISDN GIRL VIEW */}
                          <div className={"prelander-img-1 " + (this.state.gender === "female" ? "active" : "hidden")}>
                            <div className="img-container girl-4 vibrate-1" />
                            <div className="balloon balloon-5">
                              <div className="title-sm guy">
                                <Translate id="shower" />
                              </div>
                            </div>
                          </div>

                          {/* MSISDN BALLOON */}
                          <div className="balloon balloon-4">
                            <div className="title md-width top-sm">
                              <Translate id="keep-watching" />
                            </div>

                            {RDS.WhenSuccess<MSISDNEntrySuccess, JSX.Element>(
                              <MSISDNEntryStep msisdn={this.state.msisdn} rds={rds} onEnd={msisdn => {
                                this.setState({ msisdn });
                                this.props.actions.submitMSISDN(
                                  window,
                                  null,
                                  msisdn
                                );
                              }}
                              />,
                              data =>
                                <MO {...data} />
                            )(rds)}
                          </div>

                          {/* MO VIEW */}
                          {/* <div className="balloon balloon-4">
                      <div className="title top-sm lg">
                        To keep watching, send SMS now
                      </div>
                      <div className="btn-container">
                        <MO keyword="SEXY" shortcode="3678"></MO>
                      </div>
                    </div> */}
                          {/* MO VIEW END */}
                        </div>
                      </div>
                    ),

                    completed: () => (
                      <div>
                        <TQStep finalUrl={""} />
                      </div>
                    )
                  })(this.props.currentState)}

                  {/* <button type="button" className="btn both full-width lg" onClick={this.showMO}>
                  Show MO
                </button> */}
                </div>
             
            </div>
            <CustomTesti className="sexy-wallpaper" testimonials={[{
              Message: () => (
                <span className="message">
                  <Translate id="testimonial-1" />
            </span>
              ),
              Name: () => <span className="testimonials-name">- <Translate id="testimonial-name-1" /></span>,
              stars: 5
            },
            {
              Message: () => (
                <span className="message">
                  <Translate id="testimonial-2" />
            </span>
              ),
              Name: () => <span className="testimonials-name">- <Translate id="testimonial-name-2" /></span>,
              stars: 5
            },
            {
              Message: () => (
                <span className="message">
                  <Translate id="testimonial-3" />
            </span>
              ),
              Name: () => (
                <span className="testimonials-name">- <Translate id="testimonial-name-3" /></span>
              ),
              stars: 5
            }
            ]}
            />
          </div>
          <div className="sexy-wallpaper-disclaimer">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        </div>
      </div>
       </TranslationProvider>
    );
  }
}
export default HOC(tracker, Root)(initialState);