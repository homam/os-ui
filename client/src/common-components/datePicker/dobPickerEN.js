import React from "react";
import "./dobPickerEN.less?raw";

class dobPickerEN extends React.PureComponent {
  render() {
    const fromYear = 1940;
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const fromDay = 1;
    return (
      <div>
        <select>
          {[...new Array(31).keys()]
            .map(i => fromDay + i)
            .map(i => (
              <option key={i.toString()}>{i}</option>
            ))}
        </select>

        <select>
          {months.map(i => (
            <option key={i.toString()}>{i}</option>
          ))}
        </select>

        <select>
          {[...new Array(80).keys()]
            .map(i => fromYear + i)
            .map(i => (
              <option key={i.toString()}>{i}</option>
            ))}
        </select>
      </div>
    );
  }
}


export default dobPickerEN 