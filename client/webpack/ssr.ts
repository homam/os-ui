const fs = require("fs");
const path = require("path");

const { renderToNodeStream, renderToString } = require("react-dom/server");
const React = require("react");

const page = process.env.page

const ReactApp = require(`../dist/static/${page}/ssr/main`).default;

const reactElement = React.createElement(ReactApp);


const inputFileName = path.join(__dirname, `../dist/static/${page}/html`, "index.html");
const outputFileName = path.join(__dirname, `../dist/static/${page}/html`, "index.ssr.html");

const file = fs.readFileSync(inputFileName, "utf8");
const [head, tail] = file.split("{react-app}");

fs.writeFileSync(outputFileName, head + renderToString(reactElement) + tail, 'utf8' )
