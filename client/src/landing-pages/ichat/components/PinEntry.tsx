import * as React from "react"
import {Translate, injectIntl} from "./../localization/index"
import { InjectedIntlProps } from "react-intl";

interface IProps {
  value,
  msisdnValue
  onSendClicked,
  onNotMyMobileClicked
}

class PinEntry extends React.PureComponent<IProps & InjectedIntlProps> {

  state = {
    value: this.props.value
  }

  render() {
    return <div className="animated" id="pinEntry">

      <div id="pinForm">
        <input 
        type="tel" 
        value={this.state.value} 
        onChange={ev => this.setState({ value: ev.target.value })} 
        name="pin" 
        id="pin" 
        maxLength={4} 
        placeholder={this.props.intl.formatMessage({id: "enter_pin_number_here", defaultMessage: "Enter PIN code here..."})} 
         />

        <button onClick={() => this.props.onSendClicked(this.state.value)}><Translate id="pin_btn_text" defaultMessage="Send" /></button>

      </div>

      <div id="msisdnCheck">

      <Translate id="msisdnCheck_if" defaultMessage="If" />  
      <span id="userMSISDN"> {this.props.msisdnValue} </span> 
      <Translate id="msisdnCheck_not" defaultMessage="is not your mobile number" />
        <a href="javascript: void 6" onClick={() => this.props.onNotMyMobileClicked()}> <Translate id="msisdnCheck_click" defaultMessage="Click here" /> </a>.

    </div>

    </div>

  }
}

export default injectIntl(PinEntry)