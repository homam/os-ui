/*
  TypeScript requires CSS modules to have an associated "*.d.ts" decleration file.
  This scripts creates these decleration files with dummy content to just help TypeScript to compile
  This script must run before compiling any page with webpack (whether in dev or prod).
  Our webpack pipeline will override these "*.d.ts" files with the right content.
*/
const glob = require("glob")
const fs = require('fs')
const { resolve } = require('path')

const toPromise = (f) => (...args) => new Promise((resolve, reject) => {
  f(...args, (err, res) => !!err ? reject(err) : resolve(res))
})

const content = `
  declare const ex : {
    [key:string]: string;
  }
  export = ex
`

const write = async fileName => {
  try {
    return await toPromise(fs.writeFile)(`${fileName}.d.ts`, content, { flag: 'wx' })
  } catch(ex) {
    // console.log('>>>', ex)
    if(ex.code == 'EEXIST') {
      return null
    } else {
      throw ex;
    }
  }
}

async function main () {
  const files = <string[]> await toPromise(glob)(
      resolve(__dirname, '../../src') + "/**/*.{less,css,styl}"
    , {} 
  )
  
  return Promise.all(files.map(write))
}

main()
  .then(console.log)
  .catch(console.log)