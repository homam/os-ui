/*
  {page}/hotReload.js
  This file is intended to be symlinked in the actual pages.
  If you edit this file, your changes will probably affect all pages. So be careful!
*/

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer as Hot } from 'react-hot-loader'

import Root from './'

const render = () => {
  ReactDOM.render(<Hot><Root /></Hot>, document.querySelector('react'))
}

render()

module.hot.accept(render)
