import * as React from "react"
import {Translate, injectIntl} from "./../localization/index"
import { InjectedIntlProps } from "react-intl";
import cancelAndDebounce from "./cancelAndDebounceEvent";
import { checkPropTypes } from "prop-types";

interface IProps {
  value,
  onSendClicked, 
  onCheckChanged: (checked: boolean) => void
  checked : boolean,
  onTerms
  //onTermsClicked
}

class NumberEntry extends React.PureComponent<IProps & InjectedIntlProps> {

  state = {
    value: this.props.value
  }

  render() {

    return <form className="animated" id="numberEntry" onSubmit={cancelAndDebounce((ev: React.FormEvent<HTMLFormElement>) => {
      this.props.onSendClicked({value: this.state.value, checked: this.props.checked})
    }, 1000)}>

      <div id="numberForm">

        <input type="tel" value={this.state.value} onChange={ev => {
          this.setState({ value: ev.target.value })
        }} name="msisdn" id="msisdn" maxLength={10} placeholder={this.props.intl.formatMessage({id: "enter_mobile_number_here", defaultMessage: "Enter mobile number here..."})} />

        <button id="msisdnBtn" type="submit"><Translate id="msisdn_btn_send" defaultMessage="Send" /></button>

      </div>

      <div id="terms">

       <input type="checkbox" checked={this.props.checked} onChange={ev => this.props.onCheckChanged( ev.target.checked)} name="agree" id="agree"/>

       <label htmlFor="agree">

       <Translate id="sa_terms_text" defaultMessage="I accept" />
       <a href="javascript:void(0)" onClick={()=>this.props.onTerms()}><Translate id="sa_terms_link_text" defaultMessage="Terms &amp; Conditions" /></a>

         {
         /*<Translate id="alternate_accept_first" defaultMessage="Terms" />
         <a  target="_blank">
          <Translate id="text_terms" defaultMessage="Terms &amp; Conditions" /></a>

          <Translate id="alternate_accept_second" defaultMessage="Conditions" />

         <a  target="_blank">
          <Translate id="text_price" defaultMessage="Final message price" /></a>*/
          }

         </label>

       {/*<label htmlFor="agree">
         <Translate id="alternate_accept_first" defaultMessage="Terms" />
         <a href="http://n.mobioastro.com/gr/tnc-mobioastro?offer=1&_next=general_conditions.html" target="_blank">
          <Translate id="text_terms" defaultMessage="Terms &amp; Conditions" /></a>

          <Translate id="alternate_accept_second" defaultMessage="Conditions" />

         <a href="http://paydash.gr/pinakas-ypp/" target="_blank">
          <Translate id="text_price" defaultMessage="Final message price" /></a>
         </label>
      */}

      </div>

    </form>


  }

}

export default injectIntl(NumberEntry)