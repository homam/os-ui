import fs from "fs";
import path from "path";

const { renderToString } = require("react-dom/server"); 
const React = require("react");

const {country, page} = process.env

const ReactApp = require(`../dist/static/${page}/ssr/main`).default;

const reactElement = React.createElement(ReactApp);


const inputFileName = path.join(__dirname, `../dist/static/${page}/html`, `index.html`);
const outputFileName = path.join(__dirname, `../dist/static/${page}/html`, `index_${country}.ssr.html`);

const file = fs.readFileSync(inputFileName, "utf8");
const [head, tail] = file.split("{react-app}");

fs.writeFileSync(outputFileName, head + renderToString(reactElement) + tail, 'utf8' )
