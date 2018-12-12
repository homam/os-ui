import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, { IProps, initialState } from "../../clients/one-click/HOC"
import "./assets/styles.less?raw"
import CustomToplegal from "./components/CustomToplegal";


const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "yoga" 
);

const ButtonArea = ({ clicked, subscribeNowClicked, confirmClicked }) => {
  if (clicked) {
    return <div>



      <button className="ConfirmBtn" onClick={confirmClicked}>Confirm</button>
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
              <div className="time">
                
              </div>

              <div className="logo"></div>
              <h1 className="toptitle">Home Yoga Class</h1>

              <div className="text">
                <p>Healthier You. Any place. Any time</p>
              </div>


              {/* <div className="pricetext">
                <h2>£3.00 per week<br></br>
                <span>Free for 24 hours</span></h2>

                <div className="border2"></div>
                
                <p>Charges added to this mobile bill.</p>
              
              </div> */}

            </div>



            <ButtonArea clicked={this.state.clicked}
              subscribeNowClicked={() => {
                this.setState({ clicked: true });
                tracker.advancedInPreFlow('Click 1')
              } }
              confirmClicked={() => this.props.actions.onClick()}


            />

            <div className="wrap">

              <p className="wraptext">Get unlimited weekly access cheaper<br></br>than the cost of one regular class</p>
              <div className="price">
                  <span>£3.00 per week</span>
              </div>
              
              <div className="undertext">
                  <span>Charges added to this mobile bill.</span>
              </div>


 

            </div>



          

            <div className="disclaimer">

              <p>Subscribe and transform your body, mind and life today for just £3.00 a week! Service provided by Mobio TV</p>

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