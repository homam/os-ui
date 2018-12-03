import * as React from "react";
import "./msisdn.css?raw";


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

class MsisdnComponent extends React.Component {

  render() {
   
    return (
      <div className="App">
      <div className="msisdn-wrapper">
        <div className="phone" />

        <div className="country-code country-code-qa">(975)</div>
        <DigitOnlyInput className="msisdn-input" type="tel" maxLength={8} />
        {/*<label className="placeholder">Placeholder</label> */}
      </div>
    </div>
    )
  }
}

  



export default MsisdnComponent