import * as React from 'react'

import "./ComponentToplegal.less?raw"

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    return <div className="header">
 
				<div className="LEGAL_TEXT_TOP">Help Call : 0333 313 7994<br></br>Cancel anytime text STOP to 86707</div>
				<a href="https://www.google.com/" className="exitBtn">Exit</a>

  </div>
  }

}