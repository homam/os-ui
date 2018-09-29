import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview
} from 'react-live'

import Timer from '../src/landing-pages/first/components/Timer'
import Counter from '../src/landing-pages/first/components/Counter'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer as Hot } from 'react-hot-loader'

const MyProvider = ({ code, scope, head }) => <div style={{borderBottom: 'solid 1px silver', margin: '0 0 20px 0'}}>
  { !!head ? <pre className="prism-code">{head}</pre> : "" }
  <LiveProvider scope={scope} code={code}>
    <LiveEditor />
    <LiveError />
    <LivePreview />
  </LiveProvider>
</div>

const Component = () => (
  <div>
    <MyProvider code="<strong>Hello World!</strong>" />
    <MyProvider scope={{Timer}} 
                head="import Timer from '../src/landing-pages/first/components/Timer'" 
                code="<Timer duration={30} />" />
    <MyProvider scope={{Counter}} 
                head="import Counter from '../src/landing-pages/first/components/Counter'"
                code={`<Counter 
  from={0}
  to={100}
  className=""
  interval={30}
  onEnd={() => void 6} />
    `} />
  </div>
)

const render = () => {
  ReactDOM.render(<Hot><Component /></Hot>, document.querySelector('react'))
}

render()

module.hot.accept(render)
