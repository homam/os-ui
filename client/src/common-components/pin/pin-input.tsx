import * as React from "react";
import "./pin.css?raw";

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
  pin: string
  placeholder: string
  onChange: (pin: string) => void;
}


export default class PinComponent extends React.Component<IProps> {

  render() {
    return (
      <div className="input-wrapper">
        <DigitOnlyInput
          value={this.props.pin}
          onChange={pin => this.props.onChange(pin)}
          className="pin-input"
          type="tel"
          placeholder={this.props.placeholder}
          maxLength={this.props.maxLength}
        />
      </div>
    )
  }
}

// export default pinComponent