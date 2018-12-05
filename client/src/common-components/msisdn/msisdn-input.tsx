import * as React from "react";
import "./msisdn.css?raw";
import { Translate } from "aws-sdk/clients/all";

function DigitOnlyInput(props: any) {
  console.log(props)
  return <input
    type="tel"
    onKeyDown={ev => {
      if (/\d/.test(ev.key) || [8, 37, 38, 39, 40].some(k => k == ev.keyCode)) {
        return true;
      } else {
        ev.preventDefault()
        return false;
      }
    }}
    {...props}
  />
}

interface IProps {
  maxLength: number
}


export default class MsisdnComponent extends React.Component<IProps> {

  render() {
    
    return (
      <div className="App">
      <div className="msisdn-wrapper">
      
        <div className="phone flag flag-qac " />

        <div className="country-code country-code-qa">(+975)</div>
        <DigitOnlyInput className="msisdn-input" type="tel" maxLength={this.props.maxLength} />
        
      </div>
    </div>
    )
  }
}

  



// export default MsisdnComponent