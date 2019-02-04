
import fs from 'fs'
import path from 'path'
import glob from "glob"
import S3 = require('aws-sdk/clients/s3');
import asyncPool from "tiny-async-pool";
import mime from 'mime-types'

const toPromise = (f) => (...args) => new Promise((resolve, reject) => {
  f(...args, (err, res) => !!err ? reject(err) : resolve(res))
})

const client = new S3({
  accessKeyId: process.env.osui_aws_access_key_id,
  secretAccessKey: process.env.osui_secret_access_key,
});

const upload = ({key, file}) =>
  client.upload({
    Bucket: 'mobirun',
    Key: `os-ui${key}`,
    Body: fs.createReadStream(file),
    ACL: 'public-read', 
    ContentType: mime.contentType(path.extname(file)),
    CacheControl: /\.html$/.test(file) ? 'max-age=2592000' : 'max-age=1'
  }).promise()


async function main () {
  const root = path.resolve(__dirname, '../../dist')
  
  const files = <string[]> await toPromise(glob)(
    root + "/static/**/*.*"
  , {} 
  )
  const uploadResult = await asyncPool(4, files.map(f => ({key: f.replace(root, ''), file: f})), upload)
  console.log(`✅  # ${uploadResult.length} Uploaded!`)

}
main().then(console.log).catch(console.error)
