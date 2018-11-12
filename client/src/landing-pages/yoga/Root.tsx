import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, { IProps, initialState } from "../../clients/one-click/HOC"
import "./assets/styles.less?raw"
import CustomToplegal from "./components/CustomToplegal";
import CustomTesti from "../bid-win/components/CustomTesti";


const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "yoga" 
);

const ButtonArea = ({ clicked, subscribeNowClicked, confirmClicked }) => {
  if (clicked) {
    return <div>

      <button className="ConfirmBtn" onClick={confirmClicked}>Confirm<br></br>£4.50 per week!</button>
    </div>
  } else {
    return <div><button className="SubscribeBtn" onClick={subscribeNowClicked}>Subscribe Now!<br></br>£4.50 per week!</button></div>
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

            <div className="rate"></div>

            <div className="creative">
              <div className="timeico">
                <h1>15</h1>
                <span>MIN</span>
              </div>

              <div className="lotusicon"></div>
              <h1 className="toptitle">A day for</h1>

              <div className="title">
                <h1><strong>Quick</strong> &amp; <strong>Effective</strong></h1>
                <br></br>
                <span>Home Yoga</span>
              </div>

              <div className="border"></div>

              <div className="text">
                <p>Choose only 15 minute video streaming practices,  begin every day connected &amp; energized</p>
              </div>

              <div className="yogapose"></div>
              <div className="triangle-down"></div>


            </div>



            <ButtonArea clicked={this.state.clicked}
              subscribeNowClicked={() => this.setState({ clicked: true })}
              confirmClicked={() => this.props.actions.onClick()}


            />

            <CustomTesti className="british-testimonials no-anim" testimonials={
              [
                {
                  Message: () => <span className="message">It’s really helped me to establish an at-home practice.</span>,
                  Name: () => <span> -Emily</span>,
                  stars: 4
                },
                {
                  Message: () => <span className="message">Wow! Love the only 15 minutes yoga sessions!</span>,
                  Name: () => <span> -Grace</span>,
                  stars: 5
                },
                {
                  Message: () => <span className="message">It's been a great tool for me to keep a regular practice at home.</span>,
                  Name: () => <span> -Sophia</span>,
                  stars: 5
                }
              ]


            } />

            <div className="disclaimer">

              <p>Subscribe and transform your body, mind and life today for just £4.50 a week! Service provided by Mobio TV</p>

              <div className="links">
                <a href="" className="align-left">Terms &amp; Conditions</a>
                <a href="" className="align-right">Privacy Policy</a>
              </div>

            </div>


            <div className="benefits">

              <h1 className="yogabenefits">Benefits of Yoga</h1>
              <ul>
                <li>Could Promote Sleep Quality and Quality of Life</li>
                <li>Could Improve Heart Health and Breathing</li>
                <li>Could Reduce Chronic Pain</li>

              </ul>

<<<<<<< HEAD
            <div className="logoarea">
              <span>Exclusive to</span>
              <div className="logo"></div>
=======
              <div className="logoarea">
                <span>Exclusive to</span>
                <div className="logo"></div>
              </div>

>>>>>>> f931126a302450e8b6719abbfefc09c5baa8b2e9
            </div>

            </div>

          </div>
        </TranslationProvider>
      </div>
    );
  }
}
export default HOC(tracker, null, Root)(initialState);