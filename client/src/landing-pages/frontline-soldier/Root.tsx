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
import CustomTesti from "../bid-win/components/CustomTesti"
import Disclaimer from "../../legal-components/Disclaimer";
import { IKeywordShortcode } from "../../clients/lp-api-mo/main";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "frontline-soldier"
);

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
          <input
            className="phone-input"
            placeholder="Phone number"
            value={this.state.msisdn}
            onChange={ev => this.setState({ msisdn: ev.target.value })}
          />
          <button type="submit" disabled={RDS.IsLoading(this.props.rds)}>
            <Translate id="submit_phone" />
          </button>
          {
            RDS.WhenLoading(null, () => 'Wait...')(this.props.rds)
          }
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

function MO({ keyword, shortcode, backToStart }: IKeywordShortcode & {backToStart: () => void}) {
  return <div>
    <MOLink keywordAndShortcode={{keyword, shortcode}}><h1>SMS {keyword} to {shortcode}</h1></MOLink>
    <div>
    <a onClick={() => backToStart()}>Try again</a>
    </div>
  </div>
}


class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "ms",
    msisdn: "",
  };
  render() {
    return (
      <div>
        <TranslationProvider locale={this.state.locale}>
          <div className="container">
            <div className="top-bar">
              <Translate id="Digital_Deluxe_Edition" defaultMessage="!!Digital Deluxe Edition!!" />
              <button
                onClick={() => {
                  if (this.state.locale === "en") {
                    this.setState({ locale: "ms" })
                    document.getElementsByTagName('html')[0].setAttribute("lang", "ms")
                  } else {
                    this.setState({ locale: "en" })
                    document.getElementsByTagName('html')[0].setAttribute("lang", "en")
                  }
                }}
              >{
                  this.state.locale === "ms"
                    ? "Change Language"
                    : "Tukar bahasa"
                }</button>
            </div>
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
                    Well done!
                  </div>
                )
              })(this.props.currentState)}
            </div>

            <div className="testimonials">
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
                      Message: () => <span className="message">Wow! I couldn't believe my eyes when I received my iPhone X!</span>,
                      Name: () => <span> -Rahim</span>,
                      stars: 4
                    },
                    {
                      Message: () => <span className="message">I bid, confirmed and won! So happy! Thank you!</span>,
                      Name: () => <span> -Amira</span>,
                      stars: 5
                    }
                  ]
                }
              />
            </div>
            <div className="disclaimer">
              <div style={{ fontSize: '12em' }}>
                {/* <Flag /> */}
              </div>
              <Disclaimer />
            </div>
          </div>
        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);