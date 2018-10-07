import * as React from 'react'
import mkTracker from '../../pacman/record'
import {TranslationProvider, Translate} from './localization/index'

const tracker = mkTracker((typeof window != "undefined") ? window : null, 'xx', 'Unknown')

class Root extends React.PureComponent  {
  state = {
    locale: 'en'
  }
  render() {
    return <TranslationProvider locale={this.state.locale}>
      <div>
        Hello World!
      </div>
    </TranslationProvider>
  }
}

export default Root