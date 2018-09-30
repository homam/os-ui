import * as React from 'react'
import mkTracker from '../../pacman/record'

const tracker = mkTracker((typeof window != "undefined") ? window : null, 'xx', 'Unknown')

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