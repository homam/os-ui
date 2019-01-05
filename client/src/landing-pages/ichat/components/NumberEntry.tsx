import * as React from "react"


interface IProps {
  value,
  onSendClicked, 
  checked : boolean,
  onTermsClicked
}

export default class NumberEntry extends React.PureComponent<IProps> {

  state = {
    value: this.props.value,
    checked: this.props.checked
  }

  render() {
    return <div className="animated" id="numberEntry">

      <div id="numberForm">

        <input type="tel" value={this.state.value} onChange={ev => {
          this.setState({ value: ev.target.value })
        }} name="msisdn" id="msisdn" maxLength={10} placeholder="Enter mobile number here..." />

        <button onClick={() => this.props.onSendClicked({value: this.state.value, checked: this.state.checked})}>Send</button>

      </div>

      <div id="terms">

       <input type="checkbox" checked={this.state.checked} onChange={ev => this.setState({checked: ev.target.checked})} name="agree" id="agree"/>
       <label htmlFor="agree">I accept the</label>  
       <a href="javascript:void 9" onClick={() => this.props.onTermsClicked()}> Terms &amp; Conditions </a>

      </div>

    </div>


  }

}
