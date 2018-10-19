import * as React from 'react'

import "./ComponentLoader.less?raw"

export default class extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {

    return <div className="loader">
      <span className="l-1"></span>
      <span className="l-2"></span>
      <span className="l-3"></span>
      <span className="l-4"></span>
      <span className="l-5"></span>
      <span className="l-6"></span>
  </div>
  }

}