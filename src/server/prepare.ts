import * as fs from "fs"
import {Readable} from "stream"
import * as path from "path"
import * as CT from "./common-types";


const search = '<meta name="rockman-id">'
const length = search.length

const content = fs.readFileSync(path.join(__dirname, "/../../dist/index.ssr.html"), "utf8")
const index = content.indexOf(search)
const before = content.substr(0, index)
const after = content.substr(index + length)

// console.log(after)

const beforeBuff = Buffer.from(before, 'utf8');
const afterBuff = Buffer.from(after, 'utf8');

export default (rockmanId : CT.NTRockmanId) => {

  const s = new Readable()
  s.push(beforeBuff)  
  s.push(`<script>window.rockman_id='${CT.RockmanId.unwrap(rockmanId)}'</script>`)
  s.push(afterBuff)
  s.push(null) 

  return s;
}