import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {IProps, initialState} from "../../clients/one-click/HOC";
import "./assets/css/styles.less?raw";
import CustomTesti from "../bid-win/components/CustomTesti";
const rateImg = require("./assets/imgs/rate.png");
const watchImg = require("./assets/imgs/watch.png");
const monkey = require("./assets/imgs/monkey.png");
const catImg = require("./assets/imgs/cat1.jpg");
import Disclaimer from "../../legal-components/Disclaimer";

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "funny-videos" 
);

class Root extends React.PureComponent<IProps> {
  state = {
    locale: "en"
  };
  render() {
    return (
      <div>
        <TranslationProvider locale={this.state.locale}>
          <div>
            {/* <link rel="shortcut icon" href="../assets/imgs/favicon.ico"/> */}
            <div className="topBG">
              <div className="container">
              <div className="rateBar"><img src={rateImg} /><img src={watchImg} /></div>
                <div className="creative">
                  <div className="text">
                    <h1>
                     <span>ﺳﻮﻑ ﺗﺪﻣﻊ </span>
                      <span>ﻣﻦ ﻛﺜﺮ ﺍﻟﻀﺤﻚ ﻣﻊ </span>
                      <span> ﻫﺬﻩ ﺍﻟﻔﻴﺪﻳﻮﻫﺎﺕ </span>
                      <span> ﺍﻟﻜﻮﻣﻴﺪﻳﺔ </span>
                    </h1>
                  </div>
                  <div className="mainImg"><img src={monkey} /></div>
                  </div>
                <div className="middle">
               {/* <div className="btnPlace"><Link className="btnMain" tracker={tracker}>إشترك الان</Link></div> */}
                <div className="btnPlace"><button className="btnMain" onClick={() => this.props.actions.onClick()}>إشترك الان</button></div>
                <img src={catImg} />
                </div>
                <h2>إشترك الان واحصل على فترة مجانية لمدة ثلاثة أيام</h2>
              </div>
            </div>
            <CustomTesti
          className="testi"
          testimonials={
            [
              {
                Message: () => <span className="message"><Translate id="testi1_text"/></span>,
                Name: () => <span className="testimonials-name">- <Translate id="testi1_name"/></span>,
                stars: 5
              },
              {
                Message: () => <span className="message"><Translate id="testi2_text"/></span>,
                Name: () => <span className="testimonials-name">- <Translate id="testi2_name"/></span>,
                stars: 5
              },
              {
                Message: () => <span className="message"><Translate id="testi3_text"/></span>,
                Name: () => <span className="testimonials-name">- <Translate id="testi3_name"/></span>,
                stars: 5
              }
            ]
          }
        />
          </div>
        </TranslationProvider>
        <Disclaimer/>
      </div>
    );
  }
}
export default HOC(tracker, null, Root)(initialState);