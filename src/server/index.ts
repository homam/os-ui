import express from "express";
import prepare from "./prepare";
import * as path from "path";

const app = express();


app.get("/", (req: express.Request, res: express.Response) => {
  prepare().pipe(res);
});


app.use(
    express.static(path.join(__dirname, "/../../dist")) //, { maxAge: 31557600000 })
  );

app.listen(3030);
