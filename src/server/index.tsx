import * as React from 'react'
import { renderToString } from "react-dom/server"
import App from '../Root';
export default (cb) => {
    const html = renderToString(
        <App />
    );
    cb(html)
    return html
};