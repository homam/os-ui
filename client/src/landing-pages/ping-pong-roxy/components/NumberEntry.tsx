import * as React from "react"
import {Translate, injectIntl} from "./../localization/index"
import { InjectedIntlProps } from "react-intl";


interface IProps {
  value,
  onSendClicked, 
  checked : boolean,
  onTermsClicked
}

class NumberEntry extends React.PureComponent<IProps & InjectedIntlProps> {

  state = {
    value: this.props.value,
    checked: this.props.checked
  }

  render() {
    return <div className="animated" id="numberEntry">

      <div id="numberForm">

        <input type="tel" value={this.state.value} onChange={ev => {
          this.setState({ value: ev.target.value })
        }} name="msisdn" id="msisdn" maxLength={10} placeholder={this.props.intl.formatMessage({id: "enter_mobile_number_here", defaultMessage: "Enter mobile number here..."})} />

        <button onClick={() => this.props.onSendClicked({value: this.state.value, checked: this.state.checked})}><Translate id="msisdn_btn_send" defaultMessage="Send" /></button>

      </div>

      <div id="terms">

       <input type="checkbox" checked={this.state.checked} onChange={ev => this.setState({checked: ev.target.checked})} name="agree" id="agree"/>
       <label htmlFor="agree"><Translate id="accept_text" defaultMessage="I accept the" /></label>  
       <a href={this.props.intl.formatMessage({id: "terms_link", defaultMessage: "javascript:void 9"})} /*onClick={() => this.props.onTermsClicked()}*/ target="_blank"><Translate id="terms_text" defaultMessage="Terms &amp; Conditions" /></a>

      </div>

    </div>


  }

}

export default injectIntl(NumberEntry)