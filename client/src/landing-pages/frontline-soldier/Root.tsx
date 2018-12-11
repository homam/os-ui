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
//import CustomTesti from "../bid-win/components/CustomTesti";
// import Disclaimer from "../../legal-components/Disclaimer";
import { IKeywordShortcode } from "../../clients/lp-api-mo/main";
import { MSISDNEntryStep } from "./MSISDNEntryStep";
import { en } from "../candy-monster/localization/addLocaleData";
import { mockedPINState } from "../../clients/lp-api/HOC";
import { mockFailureState, mockLoadingState, mockSuccessState } from "../../clients/mpesa/TolaHOC";
import { MockObserver } from "rx";
const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "frontline-soldier"
);
function MO({ keyword, shortcode, backToStart }: IKeywordShortcode & { backToStart: () => void }) {
  return <div className="mo-wrapper">

    <h1><Translate id="ready-download"></Translate></h1>

    <MOLink keywordAndShortcode={{ keyword, shortcode }}><h2><em><Translate id="to-download"></Translate></em> <Translate id="send-sms"></Translate> </h2>

      <div> <span className="keyword">{keyword}</span> <Translate id="to"></Translate> <span className="shortcode">{shortcode}  </span></div>

      <button type="button" className="btn primary"><Translate id="sms-now"></Translate></button>

    </MOLink>
    <div>

      <a className="try-again" onClick={() => backToStart()}><Translate id="try-again"></Translate></a>
    </div>
  </div>
}
const TQStep = ({ finalUrl }: { finalUrl: string }) => <div className="tq-msg">
  <h3 className="tq-msg__header"><Translate id="thank-you"></Translate></h3>
  <a href={finalUrl} className="btn primary"> <Translate id="access-product"></Translate></a>
</div>;

const getDefaultLocale = () => {

  if (typeof window == "undefined") {
    // SSR at Compile-time
    return "en"
  } else {
    // In Browser
    const lsLang = localStorage.getItem('locale')
    if (!!lsLang && (lsLang == 'ms' || lsLang == 'en')) {
      return lsLang
    } else {
      return ((!!navigator.languages && navigator.languages.some(lang => /ms/.test(lang))) || /ms/.test(navigator.language)) ? 'ms' : 'en'
    }

  }
}

class Root extends React.PureComponent<HOCProps> {
  state = {
    // locale: getDefaultLocale(),
    locale: "en",
    msisdn: ""

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
              <div className="lang-btns">
                <button type="button" className="lang-btn"
                  onClick={() => {
                    if (this.state.locale === "en") {
                      this.setState({ locale: "ar" })
                      document.getElementsByTagName('html')[0].setAttribute("lang", "ar")
                    } else {
                      this.setState({ locale: "en" })
                      document.getElementsByTagName('html')[0].setAttribute("lang", "en")
                    }
                  }}
                >{this.state.locale === "ar" ? "EN" : "عربى"}
                </button>
              </div>

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
                <strong>This is a subscription service.</strong>&nbsp;This application is
        only valid for Android phone users. Subscribers will receive Phone Memory
        application as first content and then mix application contents for the
        next broadcast onwards. Supported mobile brands include Nokia, Sony,
        Samsung, Motorola, LG, HTC, Xiaomi and more.&nbsp;
      <strong>
                  No subscription fee will be charged. Maxis subscribers: RM6(incl. 0 GST)
                  per message,&nbsp;maximum RM30(incl. 0 GST) per month.
      </strong>
                &nbsp;Normal mobile operator network charges apply. GPRS / 3G access needs
                to be enabled to download the content. Data charges are billed separately.
                Some phones do not support GPRS / 3G. Please seek parental or guardian
                approval if you are 18 years old or below.&nbsp;Helpdesk 03-21643273
                (9am-5pm Mon-Fri).&nbsp;
      <strong>To cancel send STOP BRAIN to 36556.&nbsp;</strong>
                Buz2mobile&nbsp;operates according to the Malaysian code of conduct for
                SMS services. Powered by&nbsp;MacroKiosk Bhd.
              </div>
            </div>
          </div>
        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);