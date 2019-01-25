import React from "react";
import './DOBPicker.less?raw'

class DOBPicker extends React.PureComponent {
  render() {
    const fromYear = 1940;
    const fromMonth = "Month ";
    const fromDay = 1;
    return (
      <div className="DOBPicker-container">
      <div className="arrowDown"> 
        <select>
          {[...new Array(31).keys()]
            .map(i => fromDay + i)
            .map(i => (
              <option key={i.toString()}>{i}</option>
            ))}
        </select>
        </div>

        <div className="arrowDown"> 
        <select>
          {[...new Array(12).keys()]
            .map(i => fromMonth + ++i)
            .map(i => (
              <option key={i.toString()}>{i}</option>
            ))}
        </select>
        </div>

        <div className="arrowDown"> 
        <select>
          {[...new Array(80).keys()]
            .map(i => fromYear + i)
            .map(i => (
              <option key={i.toString()}>{i}</option>
            ))}
        </select>
      </div>
      </div>
    );
  }
}

class App extends React.PureComponent {
  state = {
    dob: null
  };
  render() {
    return (
      <div className="App">
        <h1>{this.state.dob}</h1>
        <input
          type="date"
          onChange={ev => {
            this.setState({ dob: ev.target.value });
          }}
          value={this.state.dob}
        />
        <h2>Start editing to see some magic happen!</h2>
        <div>
          <DOBPicker />
        </div>
      </div>
    );
  }
}

export default DOBPicker