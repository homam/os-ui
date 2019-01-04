import * as React from "react"

interface IProps {
  value,
  msisdnValue
  onSendClicked,
  onNotMyMobileClicked
}

export default class PinEntry extends React.PureComponent<IProps> {

  state = {
    value: this.props.value
  }

  render() {
    return <div className="animated" id="pinEntry">

      <div id="pinForm">
        <input type="tel" value={this.state.value} onChange={ev => this.setState({ value: ev.target.value })} name="pin" id="pin" maxLength={4} placeholder="Enter PIN here..." />

        <button onClick={() => this.props.onSendClicked(this.state.value)}>Send</button>

      </div>

      <div id="msisdnCheck">

        if <span id="userMSISDN">{this.props.msisdnValue}</span> is not your mobile number <a href="javascript: void 6" onClick={() => this.props.onNotMyMobileClicked()}> Click here </a>.

    </div>

    </div>

  }
}