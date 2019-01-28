import React from "react";
import './DOBPicker.less?raw'
import { Translate } from "../localization/index";

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
         <option value={<Translate id="january" />}><Translate id="january" /></option>
         <option value={<Translate id="february" />}><Translate id="february" /></option>
         <option value={<Translate id="march" />}><Translate id="march" /></option>
         <option value={<Translate id="april" />}><Translate id="april" /></option>
         <option value={<Translate id="may" />}><Translate id="may" /></option>
         <option value={<Translate id="june" />}><Translate id="june" /></option>
         <option value={<Translate id="july" />}><Translate id="july" /></option>
         <option value={<Translate id="august" />}><Translate id="august" /></option>
         <option value={<Translate id="september" />}><Translate id="september" /></option>
         <option value={<Translate id="october" />}><Translate id="october" /></option>
         <option value={<Translate id="november" />}><Translate id="november" /></option>
         <option value={<Translate id="december" />}><Translate id="december" /></option>
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