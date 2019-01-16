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
    <div className="title top-sm lg">To keep watching, send SMS now</div>
    <div className="btn-container">
      <MO keyword="SEXY" shortcode="3678" />
    </div>
  </div>
  <div className="mo-wrapper">
    <MOLink keywordAndShortcode={{ keyword, shortcode }}>
      <div className="input-container">
        <div className="button-container">
          <button type="button" className="btn full-width both">
            SMS Now
          </button>
        </div>
        <div className="mo-text">OR</div>
        <div className="mo-text">
          Send <span className="keyword">{keyword}</span> to{" "}
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
      <div className="guy-1 vibrate-2" />
      <div className="girl-1 vibrate-1" />
      <div className="balloon balloon-7">
        <div className="title-sm thank-you">
          Thank you! You’ve unlocked the sexy wallpapers. Have fun!
        </div>
      </div>
    </div>
  </div>
  {/* <a href={finalUrl}>Click here to access the product</a> */}
</div>
);

class MSISDNEntryStep extends React.PureComponent< { msisdn: string; rds: RDS.RemoteDataState<MSISDNEntryFailure,
  MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
  }> {
  state = {
  msisdn: this.props.msisdn
  };

  render() {
  return (
  <form onSubmit={ev=> {
    ev.preventDefault();
    this.props.onEnd(this.state.msisdn);
    }}
    >
    <div>
      {/* MSISDN START */}
      <div>
        <div className="input-container">
          <div className="sexy-wallpaper-input">
            <MsisdnInput maxLength={8} placeholder="Phone Number" onChange={msisdn=> this.setState({ msisdn })}
              countryCode={"+66"}
              />
          </div>
          <button type="submit" className="btn both full-width lg" disabled={RDS.IsLoading(this.props.rds)}>
            Submit to subscribe
          </button>

          {RDS.WhenLoading(null, () => "Wait...")(this.props.rds)}
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
    return (
    <div>
      <div className="wrapper">
        <div className="header">
          <div className="rating">
            <img src={rating} />
          </div>
          <div className="like">
            <img src={like} /> <span className="blue">487k people</span> like
            this
          </div>
        </div>

        <div className="dark-bg">
          <div className="container">
            <TranslationProvider locale={this.state.locale}>
              <div>
                {match({
                msisdnEntry: rds => (
                <div>
                  {/* 1ST PRELANDER */}
                  <div className={ "start " + (this.state.preLander===1 ? "active" : "hidden" ) }>
                    <div className="prelander-img-1">
                      <div className="guy-1 vibrate-2" />
                      <div className="girl-1 vibrate-1" />
                    </div>
                    <div className="balloon balloon-1">
                      <div className="title">
                        Choose your babe and get an exclusive sexy
                        wallpaper!
                      </div>
                      <div className="title-2">Choose your babe</div>
                      <div className="btn-container">
                        <button type="submit" className="btn male" onClick={e=> this.genderMale(e)}
                          >
                          Male
                        </button>

                        <button type="submit" className="btn female" onClick={e=> this.genderFemale(e)}
                          >
                          Female
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 2ND PRELANDER */}
                  <div className={ "prelander " + (this.state.preLander===2 ? "active" : "hidden" ) }>
                    <div className={ "prelander-img-1 " + (this.state.gender==="female" ? "active" : "hidden" ) }>
                      <div className="prelander-img-1">
                        <div className="girl-2" />
                      </div>
                      <div className="balloon balloon-2">
                        <div className="title-2 margin-sm">
                          You think I’m hot, huh?
                        </div>
                        <div className="btn-container">
                          <button type="button" className="btn female full-width" onClick={this.nextPrelander}>
                            Of Course!
                          </button>
                          <button type="button" className="btn female full-width" onClick={this.nextPrelander}>
                            Oh yes babe!
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className={ "prelander-img-1 " + (this.state.gender==="male" ? "active" : "hidden" ) }>
                      <div className="guy-2" />

                      <div className="balloon balloon-2">
                        <div className="title-2 margin-sm">
                          You think I’m hot, huh?
                        </div>
                        <div className="btn-container">
                          <button type="button" className="btn male full-width" onClick={this.nextPrelander}>
                            Of Course!
                          </button>
                          <button type="button" className="btn male full-width" onClick={this.nextPrelander}>
                            Oh yes babe!
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 3RD PRELANDER */}
                  <div className={ "prelander " + (this.state.preLander===3 ? "active" : "hidden" ) }>
                    <div className={ "prelander-img-1 " + (this.state.gender==="male" ? "active" : "hidden" ) }>
                      <div className="guy-3" />
                    </div>
                    <div className="balloon balloon-3">
                      <div className="title-2 md-width margin-sm">
                        You seem intense, do you want a massage?
                      </div>
                      <div className="btn-container">
                        <button type="button" className="btn male full-width" onClick={this.nextPrelander}>
                          Shoulder Massage
                        </button>
                        <button type="button" className="btn male full-width" onClick={this.nextPrelander}>
                          Foot Massage
                        </button>
                      </div>
                    </div>

                    <div className={ "prelander " + (this.state.gender==="female" ? "active" : "hidden" ) }>
                      <div className="prelander-img-1">
                        <div className="girl-3" />
                      </div>
                      <div className="balloon balloon-3">
                        <div className="title-2 md-width margin-sm">
                          My shirt is dirty, what should I do?
                        </div>
                        <div className="btn-container">
                          <button type="button" className="btn female full-width" onClick={this.nextPrelander}>
                            Take off my shirt
                          </button>
                          <button type="button" className="btn female full-width" onClick={this.nextPrelander}>
                            Wash me
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MSISDN PAGE */}
                  <div className={ "prelander " + (this.state.preLander===4 ? "active" : "hidden" ) }>
                    {/* MSISDN GUY VIEW */}
                    <div className={ "prelander-img-1 " + (this.state.gender==="male" ? "active" : "hidden" ) }>
                      <div className="guy-4" />
                      <div className="balloon balloon-5">
                        <div className="title-sm guy">
                          Want to see more action?
                        </div>
                      </div>
                    </div>

                    {/* MSISDN GIRL VIEW */}
                    <div className={ "prelander-img-1 " + (this.state.gender==="female" ? "active" : "hidden" ) }>
                      <div className="girl-4" />
                      <div className="balloon balloon-5">
                        <div className="title-sm guy">
                          Follow me to the shower
                        </div>
                      </div>
                    </div>

                    {/* MSISDN BALLOON */}
                    <div className="balloon balloon-4">
                      <div className="title md-width top-sm">
                        To keep watching, enter your phone number
                      </div>

                      {RDS.WhenSuccess<MSISDNEntrySuccess, JSX.Element>(
                        <MSISDNEntryStep msisdn={this.state.msisdn} rds={rds} onEnd={msisdn=> {
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
            </TranslationProvider>
          </div>
          <CustomTesti className="sexy-wallpaper" testimonials={[ { Message: ()=> (
            <span className="message">
              I really like this app, it has really great pictures.
            </span>
            ),
            Name: () => <span className="testimonials-name">- Andy</span>,
            stars: 5
            },
            {
            Message: () => (
            <span className="message">
              Like the sexyness. I would give you 10 stars if I could.
            </span>
            ),
            Name: () => <span className="testimonials-name">- Ploy</span>,
            stars: 5
            },
            {
            Message: () => (
            <span className="message">
              I love the display and quality of the pictures. It's
              great!
            </span>
            ),
            Name: () => (
            <span className="testimonials-name">- Tanawat</span>
            ),
            stars: 5
            }
            ]}
            />
        </div>
        <div className="sexy-wallpaper-disclaimer">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam
          bibendum, magna eget convallis faucibus, libero orci molestie diam,
          eu pellentesque neque eros quis turpis. Aenean pulvinar rutrum eros
          ac bibendum. Integer id sem finibus, convallis quam ac, semper ex.
          Suspendisse congue, orci a viverra mollis, nisl nisi tempus neque,
          sollicitudin porttitor erat lectus at tellus. Morbi cursus fringilla
          rutrum. Aenean lacus massa, rutrum at convallis vel, scelerisque nec
          nunc. Mauris lacinia tempor fringilla. Mauris in quam tempor,
          ultrices ex id, mollis dui. Nunc nec odio rhoncus, aliquam diam et,
          fringilla ipsum. Sed tincidunt nisl sed arcu venenatis efficitur
          quis eget enim. Praesent a augue ligula.
        </div>
      </div>
    </div>
    );
    }
    }
    export default HOC(tracker, Root)(initialState);