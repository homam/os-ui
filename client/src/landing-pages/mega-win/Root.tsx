import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, { ITolaProps, MatchSuccess, TolaRDS, TolaFailure, initialState, match, mockLoadingState, mockFailureState, mockSuccessState } from "../../clients/mpesa/TolaHOC";
import * as RDS from "../../common-types/RemoteDataState";
import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import "./assets/css/styles.less?raw"
import { string } from "prop-types";
import Timer from "../first/components/Timer";
import CustomTesti from "../bid-win/components/CustomTesti";
import CustomLoader from "../bid-win/components/CustomLoader";
import { mockedCompletedState } from "../../clients/lp-api/HOC";
const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "mega-win"
);

const alphabet = "BDGHJKLMNPQRTVXWZ123456789".split('');
const random = (items) => items[Math.floor(Math.random() * items.length)];
const randomString = (n) => n < 1 ? '' : random(alphabet) + randomString(n - 1)
const mkUniqueCode = () => `iPHONEX_${randomString(4)}`

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: TolaRDS;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn,
    model: null,
    capacity: null,
    finish: null,
    display: 'deviceModel'
  };
  render() {
    return (
      <div className={`pageViews display-${this.state.display}`}>

        <div className="deviceModel step">

          <h2>Choose your iPhone X model.</h2>

          <button className="btnChoice" onClick={() => { this.setState({ display: 'deviceCapacity', model: 'iPhone X' }) }}>
            <span className="device phone1"></span>
            <span className="deviceName">iPhone X</span>
            <span className="deviceInfo">The 10th anniversary Apple iPhone.</span>
          </button>

          <button className="btnChoice" onClick={() => { this.setState({ display: 'deviceCapacity', model: 'iPhone Xs' }) }}>
            <span className="device phone2"></span>
            <span className="deviceName">iPhone Xs</span>
            <span className="deviceInfo">The Super Retina in two sizes.</span>
          </button>

          <button className="btnChoice" onClick={() => { this.setState({ display: 'deviceCapacity', model: 'iPhone Xr' }) }}>
            <span className="device phone3"></span>
            <span className="deviceName">iPhone Xr</span>
            <span className="deviceInfo">The All-new Liquid Retina display.</span>
          </button>

        </div>

        <div className="deviceCapacity step">

          <h2>Choose your device capacity.</h2>

          <button className="btnChoice" onClick={() => { this.setState({ display: 'deviceFinish', capacity: '64' }) }}>
            <span className="chip"></span>
            <span className="deviceName">64 GB</span>
            <span className="deviceInfo">Recommended for average users.</span>
          </button>

          <button className="btnChoice" onClick={() => { this.setState({ display: 'deviceFinish', capacity: '128' }) }}>
            <span className="chip"></span>
            <span className="deviceName">128 GB</span>
            <span className="deviceInfo">Recommended for middle-average users.</span>
          </button>

          <button className="btnChoice" onClick={() => { this.setState({ display: 'deviceFinish', capacity: '256' }) }}>
            <span className="chip"></span>
            <span className="deviceName">256 GB</span>
            <span className="deviceInfo">Recommended for highly-average users.</span>
          </button>

        </div>

        <div className="deviceFinish step">

          <h2>Choose your device finish.</h2>

          <button className="btnChoice" onClick={() => { this.setState({ display: 'finalResult', finish: 'black' }) }}>
            <span className="circle black"></span>
            <span className="deviceName">Black</span>
            <span className="deviceInfo">Highly-average users like to choose.</span>
          </button>

          <button className="btnChoice" onClick={() => { this.setState({ display: 'finalResult', finish: 'white' }) }}>
            <span className="circle white"></span>
            <span className="deviceName">White</span>
            <span className="deviceInfo">Mid-average users like to choose.</span>
          </button>

          <button className="btnChoice" onClick={() => { this.setState({ display: 'finalResult', finish: 'red' }) }}>
            <span className="circle red"></span>
            <span className="deviceName">Red</span>
            <span className="deviceInfo">Average users like to choose.</span>
          </button>

        </div>

        <div className="finalResult step">

          <h2>Here’s your chosen device info.</h2>

          <button className="btnChoice">
            <div className="wrapper">
              <span className={`device ${this.state.model}`}></span>
              <span className="deviceName">{this.state.model}</span>
              <span className="deviceInfo">
                <span className="chip"></span> {this.state.capacity}GB <span className={`circle ${this.state.finish}`}></span> {this.state.finish}
              </span>
            </div>
          </button>

          <h5>Save your chosen device info now!</h5>

          <h4>Enter your mobile number below:</h4>

          <div className="offer">Limited time offer {this.state.display == "finalResult" ? <Timer duration={30} className="cTimer" /> : null}</div>

          <form
            onSubmit={ev => {
              ev.preventDefault();
              this.props.onEnd(this.state.msisdn);
            }}
          >
            <div>
              <input
                maxLength={10}
                name="phone"
                type="tel"
                value={this.state.msisdn}
                onChange={ev => this.setState({ msisdn: ev.target.value })}
              />
              <button className="btn" type="submit" disabled={RDS.IsLoading(this.props.rds)}>Submit</button>
              <div className="msg">
                <strong>Confirm your subscription </strong> <br></br> in the <strong className="highlighted">mPesa</strong> page now!
              </div>

            </div>
            <div>
              {
                RDS.WhenLoading(null, () =>

                  <div className="error">
                    <Translate id="enter_your_mpesa_pin" />
                    { this.setState({ display: 'preloader'}) }
                  </div>

                )(this.props.rds)
              }
            </div>
            <div>
              {
                RDS.WhenFailure(null, (err: TolaFailure) =>
                  <div className="error">
                    <Translate id={err.type} />
                    {this.setState({ display: 'finalResult'})}
                  </div>
                )(this.props.rds)
              }
            </div>
          </form>

        </div>

        <div className="preloader step">
        
              <CustomLoader/>

              <h4>Processing... Please wait...</h4>

        </div>

      </div>
    );
  }
  
}

const TQStep = () => <div className="pageViews">

<div className="congrats">

  <h1>Congratulations!</h1>

  <h2>Your chosen iPhone X model is confirmed!</h2>

  <p>Winners will be contacted by phone. <br></br> Please keep your mPesa SMS.</p>

</div>

</div>; 

class Root extends React.PureComponent<ITolaProps> {
  state = {
    locale: "en",
    msisdn: "07"
  };
  render() {
    return (
      <div className="container">

        <div className="mainTitle"></div>

        <h3>YOU HAVE A CHANCE TO WIN  A BRAND NEW iPHONE</h3>

        <div>
          <TranslationProvider locale={this.state.locale}>
            {
              MatchSuccess({

                otherwise: (rds) => (
            
                    <MSISDNEntryStep
                      msisdn={this.state.msisdn}
                      rds={rds}
                      onEnd={msisdn => {
                        this.setState({ msisdn });
                        this.props.actions.chargeAndWait(msisdn, mkUniqueCode(), 199);
                      }}
                    />

                ),
                success: () => (
                    <TQStep />
                ),
              })(this.props.currentState)
            }
          </TranslationProvider>
        </div>

            <CustomTesti className="ke-testimonials" testimonials={
              [
                {
                  Message: () => <span className="message">I'm so happy that I sign up when I got a chance.</span>,
                  Name: () => <span> -Chege</span>,
                  stars: 4
                },
                {
                  Message: () => <span className="message">I was surprise' I can't believe it I've won!</span>,
                  Name: () => <span> -Muthoni</span>,
                  stars: 5
                },
                {
                  Message: () => <span className="message">I can't believe it till I got a suprise package.</span>,
                  Name: () => <span> -Chuki</span>,
                  stars: 5
                }
              ]


            } />

        <div className="disclaimer">

          <h4>Terms &amp; Conditions</h4>

          Service available only to users with a valid mPesa or Airtel money account. Service cost is Ksh 199 for a ticket into the draw for a new iPhone X,
          unless alternative prizes were specifically promoted. Promotion runs from 16-10-2018 until 02-01-2019. Winners will be drawn randomly and contacted
          by telephone on the mobile number associated with the account used to make payment. Proof of payment SMS required to claim prize. The service provider
          will cover the cost of shipping prizes to winners within the Republic of Kenya.

          <br></br>
          <br></br>

          Prizes are not transferable and non redeemable for cash. By entering the
          draw you confirm to be 18 years or older and that you have obtained the bill payer's permission. By using the service you agree to receive promotional
          marketing related to this and similar services from the same provider. Service provided by Right Net Limited, under authorisation of the Betting Control
          and Licensing Board (license number 002397 of 2018). For help call 0703065013.


      </div>

      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);