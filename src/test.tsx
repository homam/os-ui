import * as React from 'react'
import { renderToString } from "react-dom/server"
import MyPage from "./Root"

const stream = renderToString(<MyPage/>)

console.log(stream)
