import * as React from 'react'
import mkTracker, {queryString} from '../../pacman/record'
require("../../reset.css");

const tracker = mkTracker((typeof window != "undefined") ? window : null, queryString(window.location.search, 'xcid'), 'xx', 'Unknown-Page')

class Root extends React.PureComponent  {
  constructor(props) {
    super(props)
  }
  render() {
    return <div>
      Hello World!
    </div>
  }
}

export default Root