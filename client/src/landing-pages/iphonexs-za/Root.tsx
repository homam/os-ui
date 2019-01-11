import * as React from "react";
import mkTracker from "../../pacman/record";
import { TranslationProvider, Translate } from "./localization/index";
import HOC, {
  initialState,
  HOCProps,
  match
} from "../../clients/redir-to-send-sms/HOC"

import './assets/css/style.css?raw'
import PhoneInput , { getConfig } from "ouisys-phone-input/dist/common/PhoneInput";

const { commonPrefix } = getConfig(process.env.country);

const imgPhone = require("./assets/img/IphoneXS.png");
const imgtitle = require("./assets/img/imgtitle.jpg");

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Unknown" //TODO: replace Unknown with your page's name
);

function SendYesStep() {
  return <div className="reply-message"><p>Reply</p><h1>YES</h1><p>to the SMS you just received</p></div>
}

class MSISDNEntryStep extends React.PureComponent<HOCProps> {
  state = {
    msisdn: commonPrefix,
    isValid: false,
    justBecomeValid: false
  };
  buttonRef = React.createRef<HTMLButtonElement>()
  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.actions.submitMSISDN(window, null, this.state.msisdn)
        }}
      >
        <div>
        <p>enter your phone number to participate</p>
          <PhoneInput
            msisdn={this.state.msisdn}
            countryCode={process.env.country}
            showFlag={true}
            showMobileIcon={true}
            showError={true}
            onChange={({msisdn, isValid}) => {
              if(!this.state.justBecomeValid) {
              if(!this.state.isValid && isValid) {
                this.setState({ msisdn, isValid, justBecomeValid: true })
                setTimeout(() => this.buttonRef.current.focus(), 100)
              } else {
                this.setState({ msisdn, isValid })
              }
            } else {
              if(msisdn.length < this.state.msisdn.length) {
                this.setState({ msisdn, isValid, justBecomeValid: false })
              }
            }
            }}
        
           />
          <button ref={this.buttonRef} type="submit" disabled={!this.state.isValid}>Submit</button>
          {/* <button disabled={!this.state.isValid} type="submit">Submit</button> */}

        </div>
      </form>
    );
  }
}




class Root extends React.PureComponent<HOCProps> {

  state = {
    locale: "en",
  };
  render() {
    return (

      <div id="container">
        <div id="header">
          <img src={imgtitle} />
          <img src={imgPhone} />
        </div>

        <div id="msisdn-container">
          <TranslationProvider locale={this.state.locale}>

            <div>
            {
              match({
                nothingYet: () => <MSISDNEntryStep {...this.props} />,
                msisdnEntered: () => <SendYesStep />
              })(this.props.currentState)
            }
            </div>

          </TranslationProvider>
        </div>
      </div>
    );
  }
}
export default HOC(tracker, Root)(initialState);