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

const imgDwlD = require("./assets/img/download.gif");

const tracker = mkTracker(
  typeof window != "undefined" ? window : null,
  "xx",
  "Download Manager" //TODO: replace Unknown with your page's name
);

function SendYesStep() {
  return <div className="reply-message"><p>Reply</p><h1>YES</h1><p>to the SMS you just received</p></div>
}

class MSISDNEntryStep extends React.PureComponent<HOCProps> {
  state = {
    msisdn: commonPrefix,
    bupperNumber: "",
    isValid: false,
    justBecomeValid: false
  };
  buttonRef = React.createRef<HTMLButtonElement>()
  inputRef = React.createRef<HTMLInputElement>()
  render() {
    return (
      <form
        onSubmit={ev => {
          ev.preventDefault();
          this.props.actions.submitMSISDN(window, null, this.state.bupperNumber)
        }}
      >
        <div>
        <p>enter your phone number</p>
          <PhoneInput
             inputElementRef={this.inputRef}
             placeholder = "Enter phone number"
            msisdn={this.state.msisdn}
            countryCode={process.env.country}
            showFlag={true}
            showMobileIcon={true}
            showError={true}
            onChange={({msisdn, isValid, bupperNumber}) => {
              
                this.setState({ msisdn, isValid, bupperNumber })
              
                
            }
            }
        
           />
          <button ref={this.buttonRef} type="submit" disabled={!this.state.isValid}>Submit</button>
          {/* <button disabled={!this.state.isValid} type="submit">Submit</button> */}
          <div className="text">
          <span>subscription R10/day</span>
            <p>For Help call 011 218 5618' <a href="http://n.vidzclubs.com/za/tnc-vidzclubs?device=pc&offer=1">Terms and Conditions</a></p>
          </div>
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
          <img src={imgDwlD} />
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