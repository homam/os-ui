const fs = require("fs");
const path = require("path");

const { renderToNodeStream, renderToString } = require("react-dom/server");
const React = require("react");
const ReactApp = require("../../dist/static/ssr/main").default;

const reactElement = React.createElement(ReactApp);


const inputFileName = path.join(__dirname, "../../dist", "index.html");
const outputFileName = path.join(__dirname, "../../dist", "index.ssr.html");

const file = fs.readFileSync(inputFileName, "utf8");
const [head, tail] = file.split("{react-app}");

fs.writeFileSync(outputFileName, head + renderToString(reactElement) + tail, 'utf8' )
