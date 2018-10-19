import * as React from 'react'
import Slider, { createSliderWithTooltip } from "rc-slider";

import "rc-slider/assets/index.css?raw";
import "./ComponentSlider.less?raw"

interface IDynamicBoundsProps {
  onChange: (value: number) => void;
  value: number;
  min: number;
  max: number;
  currency: string;
}

export default class DynamicBounds extends React.PureComponent<IDynamicBoundsProps> {
  constructor(props) {
    super(props);
  }
  onSliderChange = value => {
    this.props.onChange(value)
  };

  render() {

    return <div>

      <div className="bidAmount">{this.props.currency} <span className="amount">{this.props.value}</span></div>

      <div className="bidSliderArea">

        <Slider className="bidSlider"
          defaultValue={this.props.value}
          min={this.props.min}
          max={this.props.max}
          onChange={this.onSliderChange} />

        <span className="alignLeft">{this.props.currency} {this.props.min}</span>
        <span className="alignRight">{this.props.currency} {this.props.max}</span>

      </div>

    </div>
  }

}




