import * as React from 'react'
import { render } from 'react-dom'
import Root from './Root'
// import Root from './landing-pages/first'

export default Root

if (!module.hot) render(<Root />, document.querySelector('#root'))
