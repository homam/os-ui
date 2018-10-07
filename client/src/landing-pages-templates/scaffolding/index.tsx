/*
  {page}/index.tsx
  This file is intended to be symlinked in the actual pages.
  If you edit this file, your changes will probably affect all pages. So be careful!
*/

import * as React from 'react'
import { render } from 'react-dom'
import Root from './Root'

export default Root

if (!module.hot) render(<Root />, document.querySelector('#root'))
