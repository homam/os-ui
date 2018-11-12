import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, { ITolaProps, MatchSuccess, TolaRDS, TolaFailure, initialState } from "../../clients/mpesa/TolaHOC";
import * as RDS from "../../common-types/RemoteDataState";
import { SimpleOpacityTransition, TransitionGroup, simpleOpacityTransitionStyles } from "../../common-components/simple-opacity-transition";
import "./assets/css/styles.less?raw"

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "mega-win" //TODO: replace Unknown with your page's name
);

const alphabet =  "BDGHJKLMNPQRTVXWZ123456789".split('');
const random = (items) => items[Math.floor(Math.random()*items.length)];
const randomString = (n) => n < 1 ? '' : random(alphabet) + randomString(n - 1)
const mkUniqueCode = () => `iPHONE_${randomString(4)}`

class MSISDNEntryStep extends React.PureComponent<{
  msisdn: string;
  rds: TolaRDS;
  onEnd: (msisdn: string) => void;
}> {
  state = {
    msisdn: this.props.msisdn
  };
  render() {
    return (
      <div className="pageViews">

        <div className="deviceModel">

          <h2>Choose your iPhone X model.</h2>

          <button className="btnChoice">
            <span className="device phone1"></span>
            <span className="deviceName">iPhone X</span>
            <span className="deviceInfo">The 10th anniversary Apple iPhone.</span>
          </button>

          <button className="btnChoice">
            <span className="device phone2"></span>
            <span className="deviceName">iPhone Xs</span>
            <span className="deviceInfo">The Super Retina in two sizes.</span>
          </button>

          <button className="btnChoice">
            <span className="device phone3"></span>
            <span className="deviceName">iPhone Xr</span>
            <span className="deviceInfo">The All-new Liquid Retina display.</span>
          </button>

        </div>

        <div className="deviceCapacity">

          <h2>Choose your device capacity.</h2>

          <button className="btnChoice">
            <span className="chip"></span>
            <span className="deviceName">64 GB</span>
            <span className="deviceInfo">Recommended for average users.</span>
          </button>

          <button className="btnChoice">
            <span className="chip"></span>
            <span className="deviceName">128 GB</span>
            <span className="deviceInfo">Recommended for middle-average users.</span>
          </button>

          <button className="btnChoice">
            <span className="chip"></span>
            <span className="deviceName">256 GB</span>
            <span className="deviceInfo">Recommended for highly-average users.</span>
          </button>

        </div>

        <div className="deviceFinish">

          <h2>Choose your device finish.</h2>

          <button className="btnChoice">
            <span className="circle black"></span>
            <span className="deviceName">Black</span>
            <span className="deviceInfo">Highly-average users like to choose.</span>
          </button>

          <button className="btnChoice">
            <span className="circle white"></span>
            <span className="deviceName">White</span>
            <span className="deviceInfo">Mid-average users like to choose.</span>
          </button>

          <button className="btnChoice">
            <span className="circle red"></span>
            <span className="deviceName">Red</span>
            <span className="deviceInfo">Average users like to choose.</span>
          </button>

        </div>

        <div className="finalResult">

          <h2>Here’s your chosen device info.</h2>

          <button className="btnChoice">
              <div className="wrapper">
                <span className="device phone1"></span>
                <span className="deviceName">iPhone X</span>
                <span className="deviceInfo">
                  <span className="chip"></span> 64GB <span className="circle white"></span> White
              </span>
              </div>
          </button>
          
        </div>

      </div>
    );
  }
}


const TQStep = () => <div>
  <h3>Thank you!</h3>
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

        <TranslationProvider locale={this.state.locale}>
          <MSISDNEntryStep
            msisdn={this.state.msisdn}
            rds={this.props.currentState}
            onEnd={(msisdn) => {
              this.setState({ msisdn });
              this.props.actions.chargeAndWait(msisdn, mkUniqueCode(), 10);
            }}
          />
        </TranslationProvider>

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