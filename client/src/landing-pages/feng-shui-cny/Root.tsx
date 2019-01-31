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
import "./assets/css/style.less?raw";
import CustomTesti from "../bid-win/components/CustomTesti";
import DOBPicker from "./components/DOBPicker";
import MsisdnComponent from '../../common-components/msisdn/msisdn-input';
import { IKeywordShortcode } from "../../clients/lp-api-mo/main";
import Disclaimer from "../../legal-components/Disclaimer";
import PhoneInput, { getConfig } from "ouisys-phone-input/dist/common/PhoneInput"
import { translate } from "../../../webpack/dev-utils/translate-by-yandex";

// const shape = require("./assets/img/top-left.svg");
// const editorChoice = require("./assets/img/ed-choice.svg");
// const likes = require("./assets/img/likes.svg");

document.documentElement.lang
const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Feng Shui CNY"
);

function Wait(props) {
  return (
    <div>
      <Translate id="wait" />
    </div>
  )
}


function MO({ keyword, shortcode, backToStart }: IKeywordShortcode & { backToStart: () => void }) {
  return (
    <div>

      <div className="">
        <div className="mo-fade mo-fade-en">
          <Translate id="mo-title"></Translate>
          <br></br>
          <Translate id="mo-title-breaks"></Translate>
        </div>

        <div className="line-breaks">
          <Translate id="mo-title-2"></Translate>
        </div>

        <MOLink keywordAndShortcode={{ keyword, shortcode }}>
          <div className="input-container">
            <div className="btn-container">

              <button type="button" className="btn both uppercase">
                <Translate id="send-sms" />
              </button>
            </div>
            <div className="mo-top">
              <div className="mo-text">OR</div>
              <div className="mo-text">
                Send <span className="keyword">{keyword}</span> to{" "}
                <span className="shortcode">{shortcode} </span>
              </div>
            </div>
          </div>
        </MOLink>

        <div className="try-again-top">
          <a className="try-again" onClick={() => backToStart()}><Translate id="try-again"></Translate></a>
        </div>

      </div>
    </div>
  );
};


class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string; rds: RDS.RemoteDataState<MSISDNEntryFailure,
    MSISDNEntrySuccess>;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn
  };

  phoneInputRef = React.createRef<HTMLInputElement>()

  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.onEnd(this.state.msisdn);
        }}
      >

        <div>
          {/* 1st PRELANDER */}
          <div>
            <div className="box-content">
              <Translate id="discover-fortune" />
            </div>

            <div className="section btn-container">
              <div className="box-content sub-title float-left">
                <Translate id="you-are" />
              </div>

              <div className="gender-container">
                <label className="container-radio"><Translate id="female" />
                  <input type="radio" name="radio"></input>
                  <span className="checkmark"></span>
                </label>

                <label className="container-radio"><Translate id="male" />
                  <input type="radio" name="radio"></input>
                  <span className="checkmark"></span>
                </label>

              </div>
            </div>

            <div className="box-content sub-title">
              <Translate id="date-birth" />
            </div>

            <div className="section">
              <div className="date-picker-container">
                <DOBPicker />
              </div>
            </div>
          </div>
        </div>



        <div className="box-content sub-title">
          <Translate id="phone-number" />
        </div>
        <div>
          {/* <input
            placeholder="Phone number"
            value={this.state.msisdn}
            onChange={ev => this.setState({ msisdn: ev.target.value })}
          /> */}
          <div className="msisdn-fengshui">
            {/* <MsisdnComponent
              maxLength={10}
              placeholder="Phone Number"
              onChange={(msisdn) => this.setState({ msisdn })}
              countryCode={'+60'} /> */}

            <PhoneInput
              inputElementRef={this.phoneInputRef}
              placeholder="Mobile Phone number"
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

            <button type="submit" className="btn uppercase" disabled={RDS.IsLoading(this.props.rds)}><Translate id="read-my-fortune" /></button>
            {
              RDS.WhenLoading(null, () => <Wait />)(this.props.rds)
            }
          </div>
        </div>
        <div>
          {RDS.WhenFailure(null, (err: MSISDNEntryFailure) => (
            <Translate id={err.errorType} />
          ))(this.props.rds)}
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
    msisdn: getConfig(process.env.country).commonPrefix,
    preLander: 1
  };

  componentWillMount() {
    this.checkPhoneLang();
  }

  checkPhoneLang() {
    const lang = typeof window != "undefined" ? window.navigator.language : "en"

    if (lang === "zh") {
      this.setState({
        locale: "zh"
      })
    }
  }

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
      <TranslationProvider locale={this.state.locale}>
        <div>
          <div className="wrapper">
            <div className="topbar">
              <div className="topbar-container">

                {/* <div className={`ed-container ${(this.state.locale === "zh") ? "ed-choice-zh" : "ed-choice-en"}`}></div> */}

                <div className={"ed-container " + (this.state.locale === "zh" ? "ed-choice-zh" : "ed-choice-en")}></div>
                <div className={"likes-container " + (this.state.locale === "zh" ? "likes-zh" : "likes-en")}></div>

                {/* <div className="likes-container"></div> */}

              </div>
            </div>

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



                {match({
                  msisdnEntry: rds => (
                    <div>
                      <div className="box-container">

                        <div>
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
                            data => <MO {...data} backToStart={this.props.actions.backToStart} />)(rds)}
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



                <div className="box-img bottom"></div>
              </div>
            </div>
            <CustomTesti
              className="fengshui-testimonial"
              testimonials={
                [
                  {
                    Message: () => <span className="message"><Translate id="testimonial-1" /></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="name-1" /></span>,
                    stars: 5
                  },
                  {
                    Message: () => <span className="message"><Translate id="testimonial-2" /></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="name-2" /></span>,
                    stars: 5
                  },
                  {
                    Message: () => <span className="message"><Translate id="testimonial-3" /></span>,
                    Name: () => <span className="testimonials-name"> - <Translate id="name-3" /></span>,
                    stars: 5
                  }
                ]
              }
            />
            <div className="disclaimer">
              <Disclaimer />
            </div>

          </div>
        </div>
      </TranslationProvider>
    );
  }
}
export default HOC(tracker, Root)(initialState);