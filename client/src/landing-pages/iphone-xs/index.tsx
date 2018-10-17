import 'core-js/es6/map';
import 'core-js/es6/set';
import 'whatwg-fetch'

import * as React from 'react'
import { render } from 'react-dom'
import Root from './Root'

export default Root

if (!module.hot) render(<Root />, document.querySelector('#root'))
