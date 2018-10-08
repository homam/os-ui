import { hot } from 'react-hot-loader'
import * as React from 'react'
import mkTracker from '../../pacman/record'
import {TranslationProvider, Translate} from './localization/index'
import Counter from './Counter';
import Hello from './Hello';

const tracker = mkTracker((typeof window != "undefined") ? window : null, 'xx', 'Unknown')

class Root extends React.PureComponent  {
  state = {
    locale: 'en'
  }
  render() {
    return <TranslationProvider locale={this.state.locale}>
      <div>
        <Counter />
        <Hello />
        <h3>HAAHlll</h3>
      </div>
    </TranslationProvider>
  }
}

export default hot(module)(Root)
