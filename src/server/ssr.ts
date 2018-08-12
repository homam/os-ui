const fs = require("fs");
const path = require("path");

const { renderToNodeStream, renderToString } = require("react-dom/server");
const React = require("react");
const ReactApp = require("../../dist/static/ssr/main").default;

const reactElement = React.createElement(ReactApp);


var fileName = path.join(__dirname, "../../dist", "index.html");

fs.readFile(fileName, "utf8", (err, file) => {
  if (err) {
    throw err;
  }

  

  const [head, tail] = file.split("{react-app}");
  console.log(head);
  console.log(renderToString(reactElement))
  console.log(SVGComponentTransferFunctionElement)
//   const stream = renderToNodeStream(reactElement);
//   stream.pipe(res, { end: false });
//   stream.on("end", () => {
//     res.write(tail);
//     res.end();
//   });
});

// module.exports = router;
