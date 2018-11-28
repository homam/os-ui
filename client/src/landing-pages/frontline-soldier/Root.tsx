import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {
  initialState,
  mockedCompletedState,
  HOCProps,
  PINEntryFailure,
  PINEntrySuccess,
  match,
  mockedPINState
} from "../../clients/lp-api/HOC";
import * as RDS from "../../common-types/RemoteDataState";
import "./assets/css/styles.less?raw"
import CustomTesti from "../bid-win/components/CustomTesti";
import Disclaimer from "../../legal-components/Disclaimer";
// import "../../common-components/flag-styles/flag.css?raw";
import { mockSuccessState } from "../../clients/mpesa/TolaHOC";
import { MSISDNEntryStep } from "./MSISDNEntryStep";
import { PINEntryStep } from "./PINEntryStep";
import { from } from "rxjs";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "frontline-soldier"
);


const TQStep = ({ finalUrl }: { finalUrl: string }) => <div className="tq-msg">
  <h3 className="tq-msg__header">Thank you 123!</h3>
  <a href={finalUrl} className="btn primary"> access the product</a>
</div>;



class Root extends React.PureComponent<HOCProps> {
  state = {
    locale: "en",
    msisdn: "",

  };

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
                <div className="eye-blaster">

                </div>
                <div className="box">

                  {match({
                    msisdnEntry: rds => (
                      <div>
                        <MSISDNEntryStep
                          msisdn={this.state.msisdn}
                          rds={rds}
                          onEnd={msisdn => {
                            this.setState({ msisdn });
                            this.props.actions.submitMSISDN(window, null, msisdn);
                          }}
                        />
                      </div>

                    ),
                    pinEntry: rds => (

                      <PINEntryStep
                        onEnd={pin => this.props.actions.submitPIN(pin)}
                        backToStart={() => this.props.actions.backToStart()}
                        msisdn={this.state.msisdn}
                        rds={rds}
                      />

                    ),
                    completed: ({ finalUrl }) => (
                      <div>
                        <TQStep finalUrl={finalUrl} />
                      </div>
                    )
                  })(this.props.currentState)}

                </div>
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
                        Message: () => <span className="message">Wow! I couldn't believe my eyes when I received my iPhone X! when I received my iPhone X!</span>,
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
                <Disclaimer />
              </div>
            </div>
          </div>

        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, Root)(mockedPINState);