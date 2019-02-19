/*
  {page}/index.tsx
  ⚠️ This file is intended to be symlinked in the actual pages.
  If you edit this file, your changes will probably affect all pages. So be careful!
  You will need to kill and restart webpack-dev-server when you change this file for your changes
  to take effect in the page.
*/

import * as React from 'react'
import { render } from 'react-dom'
import "@babel/polyfill";
import "intl"
import Root from './Root'

export default Root

if (!module.hot) render(<Root />, document.querySelector('#root'))
