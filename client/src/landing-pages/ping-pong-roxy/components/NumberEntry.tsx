import * as React from "react"
import {Translate, injectIntl} from "./../localization/index"
import { InjectedIntlProps } from "react-intl";


interface IProps {
  value,
  onSendClicked
}

class NumberEntry extends React.PureComponent<IProps & InjectedIntlProps> {

  state = {
    value: this.props.value
  }

  render() {
    return <form className="animated" id="numberEntry" onSubmit={(ev) => {
      ev.preventDefault();
      this.props.onSendClicked({value: this.state.value});
    }}>

      <div id="numberForm">

        <input type="tel" value={this.state.value} onChange={ev => {
          this.setState({ value: ev.target.value })
        }} name="msisdn" id="msisdn" maxLength={10} placeholder={this.props.intl.formatMessage({id: "enter_mobile_number_here", defaultMessage: "Enter mobile number here..."})} />

        <button type="submit"><Translate id="msisdn_btn_send" defaultMessage="Send" /></button>

      </div>


    </form>


  }

}

export default injectIntl(NumberEntry)