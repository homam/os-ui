import * as React from 'react'

import MSISDN from './MSISDN'
import './Root.styl'

export default class Root extends React.Component {
  constructor(params : any) {
    super(params)
  }
  render() {
    return <div id="root">Hello World!!!!!

      <MSISDN msisdn="3373" maxLength={10} />
    </div>
  }
}
