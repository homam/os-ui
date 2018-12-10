import * as React from "react";
import "./msisdn.css?raw";
import { Translate } from "aws-sdk/clients/all";

function DigitOnlyInput(props: any) {
  return <input
    {...props}
    type="tel"
    onKeyDown={ev => {
      if (/\d/.test(ev.key) || [8, 37, 38, 39, 40].some(k => k == ev.keyCode)) {
        return true;
      } else {
        ev.preventDefault()
        return false;
      }
    }}
    value={props.value}
    onChange={ev => {
      props.onChange(ev.target.value)
    }}
  />
}

interface IProps {
  maxLength: number
  msisdn?: string
  countryCode: string
  placeholder: string
  onChange: (msisdn: string) => void;
}


export default class MsisdnComponent extends React.Component<IProps> {

  render() {
    return (
      <div className="App">
      <div className="msisdn-wrapper">
      
        <div className="phone flag flag-qac " />

        <div className="country-code country-code-qa">({this.props.countryCode})</div>
          <DigitOnlyInput 
            value={this.props.msisdn} 
            onChange={msisdn => this.props.onChange(msisdn)} 
            className="msisdn-input" 
            type="tel" 
            placeholder={this.props.placeholder}
            maxLength={this.props.maxLength} 
          />
      </div>
    </div>
    )
  }
}

  



// export default MsisdnComponent