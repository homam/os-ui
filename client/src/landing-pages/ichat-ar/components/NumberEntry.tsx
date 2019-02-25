import * as React from "react"
import {Translate, injectIntl} from "./../localization/index"
import { InjectedIntlProps } from "react-intl";
import cancelAndDebounce from "./cancelAndDebounceEvent";

interface IProps {
  value,
  onSendClicked, 
}


class NumberEntry extends React.PureComponent<IProps & InjectedIntlProps> {

  state = {
    value: this.props.value,
    isOperatorSelected: false,
  }  

  render() {
    function handleClick() {
    
      this.setState({
        isOperatorSelected: true
      })
    }


    return <form className="animated" id="numberEntry" onSubmit={cancelAndDebounce((ev: React.FormEvent<HTMLFormElement>) => {
      this.props.onSendClicked({value: this.state.value})
    }, 1000)}> 

      <div className= {'boolean-operator animated ' + (this.state.isOperatorSelected ? 'hide' : 'show')} id="operator-buttons">
        <button type="button" onClick={handleClick.bind(this)} className="btn-vodafone" id="select-btn1"></button>
        <button type="button" onClick={handleClick.bind(this)} className="btn-orange" id="select-btn2"></button>
      </div>


      <div id="numberForm" className={this.state.isOperatorSelected ? 'show' : 'hide'}>
        <input type="tel" value={this.state.value} onChange={ev => {
          this.setState({ value: ev.target.value })
        }} name="msisdn" id="msisdn" maxLength={10} placeholder={this.props.intl.formatMessage({id: "enter_mobile_number_here", defaultMessage: "Enter mobile number here..."})} />
        <button id="msisdnBtn" type="submit"><Translate id="msisdn_btn_send" defaultMessage="Send" /></button>
      </div>
    </form>

  }

}

export default injectIntl(NumberEntry)