import * as React from 'react'
import { render } from 'react-dom'
import Root from './Root'

export default Root

if (!module.hot) render(<Root />, document.querySelector('react'))
