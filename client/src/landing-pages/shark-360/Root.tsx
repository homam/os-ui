import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, { IProps, initialState } from "../../clients/one-click/HOC";

import "./assets/css/styles.less?raw";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Mobio 360" //TODO: replace Unknown with your page's name
);

class Root extends React.PureComponent<IProps> {
  state = {
    locale: "en",
    display:"step1"
  };
  render() {
    return (
      <div className="container">

        <TranslationProvider locale={this.state.locale}>

          <div>

            <div className="creative">
              <div className="title"></div>
            </div>

            <div className={`holder display-${this.state.display}`}>

              <div className="step1">

                <div className="contentWrap">

                  <div className="title">EXPERIENCE A WHOLE NEW WORLD OF MOBILETAINMENT</div>

                </div>

                <button className="trigger" onClick={() => { this.setState({ display: 'step2'}) }}>Subscribe now!</button>

                <div className="priceInfoText">only R5/day</div>

              </div>

              <div className="step2">

                <div className="contentWrap">

                  <div className="title">CONGRATULATIONS</div>

                  <div className="text">You have succesfully subscribed to Mobio 360! Get ready to experience a whole new world! Simply Click the button below.</div>

                </div>

                <button onClick={() => this.props.actions.onClick()}>Go to Mobio 360!</button>

              </div>

            </div>

            <hr></hr>

            <a href="#" target="_blank" className="terms">Terms &amp; Conditions</a>

          </div>

        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, null, Root)(initialState);