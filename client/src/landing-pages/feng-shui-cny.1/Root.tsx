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
} from "../../clients/lp-api-mo/HOC";
import * as RDS from "../../common-types/RemoteDataState";
import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import "./assets/css/style.less?raw";
import CustomTesti from "../bid-win/components/CustomTesti";
import DOBPicker from "./components/DOBPicker";
import MsisdnComponent from '../../common-components/msisdn/msisdn-input';
import { IKeywordShortcode } from "../../clients/lp-api-mo/main";


const shape = require("./assets/img/top-left.svg");

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Feng Shui CNY" //TODO: replace Unknown with your page's name
);


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


class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: RDS.RemoteDataState<MSISDNEntryFailure, MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn
  };
  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.msisdn);
        }}
      >
        <div>
          {/* <input
            placeholder="Phone number"
            value={this.state.msisdn}
            onChange={ev => this.setState({ msisdn: ev.target.value })}
          /> */}
          <div className="msisdn-fengshui">
            <MsisdnComponent
              maxLength={10}
              placeholder="Phone Number"
              onChange={(msisdn) => this.setState({ msisdn })}
              countryCode={'+60'} />

            <button type="submit" className="btn uppercase" disabled={RDS.IsLoading(this.props.rds)}>Submit</button>
            {
              RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
            }
          </div>
        </div>
        <div>
          {
            RDS.WhenFailure(null, (err: MSISDNEntryFailure) => <Translate id={err.errorType} />)(this.props.rds)
          }
        </div>
      </form>
    );
  }
}


const TQStep = ({ finalUrl }: { finalUrl: string }) => <div>
  <div className="bold thank-you">Thank you!</div>
  {/* <a href={finalUrl}>Click here to access the product</a> */}
</div>;

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    msisdn: "",
    preLander: 1
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
        document.getElementById("hideLoading").className = "active";
        document.getElementById("loading-page").className = "hidden";
        document.getElementById("hide-bg").className = "hidden";
      } else {
        width++;
        elem.style.width = width + '%';
      }
    }
  };

  render() {
    return (
      <div>
<div className="topbar"></div>
        <div id="hide-bg" className={"prelander black-bg " + (this.state.preLander === 5 ? "active" : "hidden")}></div>
        {/* 5th PRELANDER */}
        <div id="loading-page" className={"prelander " + (this.state.preLander === 5 ? "active" : "hidden")}>
          <div className="loading-title uppercase">
            Reading...
              </div>
          <div id="myProgress">
            <div id="myBar"></div>
          </div>
        </div>

        <div className="wrapper">
          <div className="starbust"></div>
          <div className="lantern-container">
          <div className="lantern left wobble-hor-top"></div>
          <div className="lantern right wobble-hor-top"></div>
          </div>
          <div className="masthead vibrate-1"></div>
        </div>
        <div className="container force-top text-center">
          <div className="box-border">
            <div className="box">
              <div className="box-img top"></div>

              <TranslationProvider locale={this.state.locale}>

                  {match({
                    msisdnEntry: rds => (
                      <div className="box-container">
                      <div>
                        {/* 1st PRELANDER */}
                        <div className={"start " + (this.state.preLander === 1 ? "active" : "hidden")}>
                          <div className="box-content">
                            Discover your good fortune today.
                          </div>
                          <div className="btn-container">
                            <button type="button" className="btn uppercase" onClick={this.nextPrelander}>Read my fortune</button>
                          </div>
                        </div>


                        {/* 2nd PRELANDER */}
                        <div className={"prelander " + (this.state.preLander === 2 ? "active" : "hidden")}>
                          <div className="box-content sub-title">
                            Select the item you are interested in:
                          </div>
                          <div className="btn-container">
                            <button type="button" className="btn uppercase" onClick={this.nextPrelander}>Relationship</button>
                            <button type="button" className="btn uppercase" onClick={this.nextPrelander}>Health</button>
                            <button type="button" className="btn uppercase" onClick={this.nextPrelander}>Wealth</button>
                          </div>
                        </div>

                        {/* 3rd PRELANDER */}
                        <div className={"prelander " + (this.state.preLander === 3 ? "active" : "hidden")}>
                          <div className="box-content sub-title">
                          Please provide your gender
                          </div>
                          <div className="btn-container">
                            <div className="left-column">
                              <button type="button" className="btn-gender female uppercase" onClick={this.nextPrelander}></button>
                            </div>
                            <div className="right-column">
                              <button type="button" className="btn-gender male uppercase" onClick={this.nextPrelander}></button>
                            </div>
                          </div>
                        </div>

                        {/* 4th PRELANDER */}
                        <div className={"prelander " + (this.state.preLander === 4 ? "active" : "hidden")}>
                          <div className="box-content">
                          Please provide your date of birth
                          </div>
                          <div className="date-picker-container">
                            <DOBPicker />
                          </div>
                          <div className="btn-container">
                            <button type="button" className="btn uppercase" onClick={this.showLoading}>Start Reading</button>
                          </div>
                        </div>
                        <div className="box-content">
                          <div id="hideLoading" className={"prelander " + (this.state.preLander === 6 ? "active" : "hidden")}>
                            <div>
                            Your fortune reading is ready. <br />
                            <div className="bold">Enter your phone number to receive it.</div>
  
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
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>



                    ),
                    

                    completed: () => (
                      <div>
                        <TQStep finalUrl={""} />
                      </div>
                      )
                      })(this.props.currentState)}

                  
              </TranslationProvider>


              <div className="box-img bottom"></div>
            </div>
          </div>
          <CustomTesti
            className="fengshui-testimonial"
            testimonials={
              [
                {
                  Message: () => <span className="message">Awesome and so grateful for such a beautiful fortune teller.</span>,
                  Name: () => <span className="testimonials-name"> - Jessica Lee</span>,
                  stars: 5
                },
                {
                  Message: () => <span className="message">It's readings are seems to be true. Nice one!</span>,
                  Name: () => <span className="testimonials-name"> - Summer Chen</span>,
                  stars: 5
                },
                {
                  Message: () => <span className="message">Crazy how accurate it is. I'm very impressed with it!</span>,
                  Name: () => <span className="testimonials-name"> - Hui Jie</span>,
                  stars: 5
                }
              ]
            }
          />

          <div className="disclaimer">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque vel congue risus. Morbi at elit non est viverra cursus nec sit amet dolor. Maecenas suscipit mauris et odio gravida interdum.
          </div>

        </div>
      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);