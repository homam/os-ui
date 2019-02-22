import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {IProps, initialState, Link} from "../../clients/one-click/HOC"
import CustomToplegal from "./components/CustomToplegal";
import "./assets/styles.less?raw"

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "homeyoga burn" 
);

const ButtonArea = ({ clicked, subscribeNowClicked, confirmClicked }) => {
  if (clicked) {
    return <div>



      <Link className="ConfirmBtn" tracker={tracker}>Confirm</Link>
    </div>
  } else {
    return <div><button className="SubscribeBtn" onClick={subscribeNowClicked}>Subscribe</button></div>

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

              <div className="titles">
                  <div className="textlogo"></div>
                  
                  <div className="text">
                   <p>Access to <b>Your Online Yoga </b><br></br><b>Classes</b> For Your Health.</p>
                  
                  </div>

                
              </div>

            

              <div className="benefits">

                      <h1 className="health">
                        <ul>
                          <li>Health</li>
                        </ul>
                      </h1>

                      <h1 className="body">
                        <ul>
                          <li>Body</li>
                        </ul>
                      </h1>

                      <h1 className="mind">
                        <ul>
                           <li>Mind</li>
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

            <div className="frame"></div>


            <div className="wrap">


              <p className="wraptext">CHEAPER than a GYM Membership <br></br><b>ONLY £4.50 per week.</b><br></br>Charges added to this mobile bill.</p>
         
              
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
