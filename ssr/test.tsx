import * as React from 'react'
import { renderToString } from "react-dom/server"
import MyPage from "../src/index"

const stream = renderToString(<MyPage/>)

console.log(stream)
