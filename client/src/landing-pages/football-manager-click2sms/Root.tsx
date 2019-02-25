import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {initialState, HOCProps, IKeywordShortcode} from "../../clients/bupper-click2sms/HOC"
import * as RDS from "../../common-types/RemoteDataState";

import "./assets/css/styles.less?raw";
import PhoneInput, { getConfig } from "ouisys-phone-input/dist/common/PhoneInput";
import Disclaimer from "../../legal-components/Disclaimer";
import CustomTesti from "../bid-win/components/CustomTesti";

const history = require("./assets/img/history.svg");


const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "football-manager-click2sms"
);

class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "ar",
    isJerseySelected: false,
    isTeamSelected: false

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

  selectJersey = () => {
    this.setState({
      isJerseySelected: true
    });
  };

  submitTeam = () => {
    this.setState({
      isTeamSelected: true
    });
  };

  phoneInputRef = React.createRef<HTMLInputElement>()


  render() {
    const MOLink = this.props.MOLink
    const {keyword, shortcode} = RDS.WhenSuccess<IKeywordShortcode, IKeywordShortcode>(
      {keyword: "", shortcode: ""},
      kw => kw
    )(this.props.currentState)
    return (
      <div>
        <TranslationProvider locale={this.state.locale}>
          <div>
          <div id="container">
            <div id="creative">
              <div className="header">
                <div className="lang-btns">
                </div>
                <div className="logo"></div>
                <div className="embelem"></div>
              </div>

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

             
                <div className={"overlay " + (this.state.isTeamSelected === true ? "active" : "")}></div>
              <div className={"c-team-selection " + (this.state.isTeamSelected === false ? "active" : "")}>

                <div className="cta-lead" />
                <div className="cta-sub-lead">
                  <Translate id="select-team-lead" />
                </div>
                <div className="team-cta">
                  <Translate id="select-team-cta" />
                </div>

                <div className="jersey-selection">
                  <input type="radio" defaultChecked={true} onClick={this.selectJersey} name="jersey" id="red-jersey" />

                  <label htmlFor="red-jersey" className="jersey">
                    <div className="jersey-red" />
                  </label>

                  <input type="radio" onClick={this.selectJersey} name="jersey" id="blue-jersey" />

                  <label htmlFor="blue-jersey" className="jersey">
                    <div className="jersey-blue" />
                  </label>

                  <input type="radio" onClick={this.selectJersey} name="jersey" id="yellow-jersey" />

                  <label onClick={this.selectTeam} htmlFor="yellow-jersey" className="jersey">
                    <div className="jersey-yellow" />
                  </label>
                </div>

                <button onClick={this.submitTeam} type="button" className="btn enabled ">
                  <Translate id="submit-team-btn" />
                </button>

              </div>


              <div className={"panel-container " + (this.state.isTeamSelected === true ? "active" : "")}>
              <div className="panel active">
                <div className="rays"></div>
                <div className="cta-lead2" />

                <div className="cta-sub-lead">
                  <div className="selected-team">
                    <div className="jersey-blue"></div>
                  </div>
                  <h1> <Translate id="selected-team-title" /></h1>
                  <p><Translate id="selected-team-lead" /></p>
                </div>

                <div className="input-wrapper">
                
                  <MOLink className="btn auto enabled cta-a-tag"><Translate id="sms-now" /></MOLink>
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
              </div>

            </div>

            </div>

            <div className="football-manager-testimonials">
                <CustomTesti
                  className="testimonials"
                  testimonials={
                    [
                      {
                        Message: () => <span className="message"><Translate id="testi1" /></span>,
                        Name: () => <span> - <Translate id="name-1" /></span>,
                        stars: 5
                      },
                      {
                        Message: () => <span className="message"><Translate id="testi2" /></span>,
                        Name: () => <span> - <Translate id="name-2" /></span>,
                        stars: 4
                      },
                      {
                        Message: () => <span className="message"><Translate id="testi3" /></span>,
                        Name: () => <span> - <Translate id="name-3" /></span>,
                        stars: 5
                      }
                    ]
                  }
                />
              </div>

              <div className="football-manager-disclaimer">
                <Disclaimer />
              </div>

          </div>
          </div>
        </TranslationProvider>
      </div>
    );
  }
}

// export default HOC(tracker, Root)(initialState);

// In the Netherlands use this instead of the above line:
export default HOC(tracker, Root, {tag: "keywordAndShortCode", shortcode: "8010", keyword: "Geld"})(initialState);