import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, { IProps, initialState, Link } from "../../clients/one-click/HOC"
import "./assets/styles.less?raw"
import CustomToplegal from "./components/CustomToplegal";


const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "bikini yoga" //TODO: replace Unknown with your page's name
);

const ButtonArea = ({ clicked, subscribeNowClicked, confirmClicked }) => {
  if (clicked) {
    return <div>



      {/* <button className="ConfirmBtn" onClick={confirmClicked}>Confirm</button> */}
      <Link className="ConfirmBtn" tracker={tracker}>Confirm</Link>
    </div>
  } else {
    return <div><button className="SubscribeBtn" onClick={subscribeNowClicked}>Subscribe Now!</button></div>

  }

  
}


class Root extends React.PureComponent<IProps> {
  state = {
    locale: "en",
    clicked: false
  };
  render() {
    return (
      <div className="container">
        <TranslationProvider locale={this.state.locale}>
          <div>


            <CustomToplegal />

            <div className="creative">
              
                  <h1 className="title">Yoga</h1>
                  <h1 className="text">
                     GET YOUR <br></br>ULTIMATE<br></br>BEACH BODY
                  </h1>

                  <div className="benefits">

                      <h1 className="quick">Quick
                        <ul>
                          <li>Get in Shape Fast</li>
                        </ul>
                      </h1>

                      <h1 className="easy">Easy
                        <ul>
                          <li>Watch Yoga Videos <br></br>and Easily Follow<br></br> Poses</li>
                        </ul>
                      </h1>

                      <h1 className="more">More
                        <ul>
                           <li>Cheaper than Gym <br></br>Membership</li>
                        </ul>
                      </h1>

                  </div>
                  
            </div>


            <ButtonArea clicked={this.state.clicked}
              subscribeNowClicked={() => {
                this.setState({ clicked: true });
                tracker.advancedInPreFlow('Click 1')
              } }
              confirmClicked={() => this.props.actions.onClick()}


            />

            <div className="wrap">

              <div className="price">
                <p>£4.50 per week</p>
              </div>
              
              <div className="undertext">
                  <span>Charges added to this mobile bill.</span>
              </div>

            </div>



            <div className="disclaimer">

              <p>Subscribe and transform your body, mind and life today for just £4.50 a week! Service provided by Mobio TV</p>

              <div className="links">
                <a href="http://n.mobiotv.com/uk/tnc-mobiotv?offer=1&_next=index.html" className="align-left">Terms &amp; Conditions</a>
                <a href="http://n.mobiotv.com/uk/tnc-mobiotv?offer=1&_next=privacy_policy.html" className="align-right">Privacy Policy</a>
              </div>

            </div>


            <div className="logoarea">
              <div className="mobiotv"></div>
            </div>

            

          </div>
        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, null, Root)(initialState);