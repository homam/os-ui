import * as React from "react"
import {Translate, injectIntl} from "./../localization/index"
import { InjectedIntlProps } from "react-intl";
import PhoneInput, { getConfig } from "ouisys-phone-input/dist/common/PhoneInput";

interface IProps {
  value,
  onSendClicked
}

class NumberEntry extends React.PureComponent<IProps & InjectedIntlProps> {

  state = {
    value: this.props.value,
    bupperNumber: this.props.value  
  }
  phoneInputRef = React.createRef<HTMLInputElement>()
  render() {
    return <form className="animated" id="numberEntry" onSubmit={(ev) => {
      ev.preventDefault();
      this.props.onSendClicked({value: this.state.bupperNumber});
    }}>

      <div id="numberForm">
<PhoneInput
              inputElementRef={this.phoneInputRef}
              placeholder="Mobile Number"
              msisdn={this.state.value}
              countryCode={process.env.country}
              showFlag={false}
              showMobileIcon={true}
              showError={false}

              onChange={({ msisdn, isValid, bupperNumber }) => {

                this.setState({ value:msisdn, isValid, bupperNumber })
              }
              }

            />
        <button type="submit"><Translate id="msisdn_btn_send" defaultMessage="Send" /></button>

      </div>


    </form>


  }

}

export default injectIntl(NumberEntry)