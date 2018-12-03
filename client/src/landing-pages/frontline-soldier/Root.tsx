import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {
  initialState,
  mockedMSISDNEntrySuccess,
  mockedCompletedState,
  HOCProps,
  MSISDNEntryFailure,
  MSISDNEntrySuccess,
  match,
  MOLink,
} from "../../clients/lp-api-mo/HOC";
import * as RDS from "../../common-types/RemoteDataState";
import "./assets/css/styles.less?raw"
import CustomTesti from "../bid-win/components/CustomTesti";
import Disclaimer from "../../legal-components/Disclaimer";
import { IKeywordShortcode } from "../../clients/lp-api-mo/main";
import { MSISDNEntryStep } from "./MSISDNEntryStep";
import { PINEntryStep } from "./PINEntryStep";
import { from } from "rxjs";
const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "frontline-soldier"
);
function MO({ keyword, shortcode, backToStart }: IKeywordShortcode & { backToStart: () => void }) {
  return <div className="mo-wrapper">

  <h1>Your game is ready for download</h1>

    <MOLink keywordAndShortcode={{ keyword, shortcode }}><h2>To <em>download</em> send SMS </h2>
    
   <div> <span className="keyword">{keyword}</span> to <span className="shortcode">{shortcode}  </span></div>

   <button type="button" className="btn primary">SMS Now</button>
    
    </MOLink>
    <div>

      <a className="try-again" onClick={() => backToStart()}>Try again</a>
    </div>
  </div>
}
const TQStep = ({ finalUrl }: { finalUrl: string }) => <div className="tq-msg">
  <h3 className="tq-msg__header">Thank you 123!</h3>
  <a href={finalUrl} className="btn primary"> access the product</a>
</div>;

const getDefaultLocale = () => {
  const lsLang = localStorage.getItem('locale')
  if (!!lsLang && (lsLang == 'ms' || lsLang == 'en')) {
    return lsLang
  } else {
    return ((!!navigator.languages && navigator.languages.some(lang => /ms/.test(lang))) || /ms/.test(navigator.language)) ? 'ms' : 'en'
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
      <div>
        <TranslationProvider locale={this.state.locale}>
          <div id="container">
            <div id="top-legal"></div>
            <div className="top-bar">
             
             
            </div>
            <div id="creative">
              <div className="header">
                <div className="rating-badge"></div>
                <div className="mature-badge"></div>
              </div>
              <div id="holder">
                <div className="eye-blaster"></div>
                <div className="box">
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
                          />, data => <MO {...data} backToStart={this.props.actions.backToStart} />)(rds)
                        }
                      </div>
                    ),
                    completed: () => (
                      <div>
                        <TQStep finalUrl={""} />
                      </div>
                    )
                  })(this.props.currentState)}


                     {/*    <div className="testimonials">
                  <CustomTesti
                    className="frontline-testimonials"
                    testimonials={
                      [
                        {
                          Message: () => <span className="message"><Translate id="testi1" /></span>,
                          Name: () => <span> -Syazalina</span>,
                          stars: 5
                        },
                        {
                          Message: () => <span className="message"><Translate id="testi1" /></span>,
                          Name: () => <span> -Rahim</span>,
                          stars: 4
                        },
                        {
                          Message: () => <span className="message"><Translate id="testi1" /></span>,
                          Name: () => <span> -Amira</span>,
                          stars: 5
                        }
                      ]
                    }
                  />
                </div> */}


                </div>

                
          
              </div>
              <div className="disclaimer">
                <Disclaimer />
              </div>
            </div>
          </div>
        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);