import inquirer from 'inquirer';
import * as shell from 'shelljs';
import path from 'path';
import chalk from 'chalk';
import fs, { mkdir } from 'fs';

const getPagePath = name => path.resolve(__dirname, `../../src/landing-pages/${name}`)
const getTemplatePath = name => path.resolve(__dirname, `../../src/landing-pages-templates/${name}`)

const P = async f => {
  const { code, stderr, stdout } = f()
  if (code != 0) {
    const err = new Error(stderr)
    err['code'] = code
    throw err
  } else {
    return stdout
  }
}

const Q = f => () => P(f)

const logAction = message => console.log(chalk.bgRgb(30,30,30).rgb(180,180,180).bold(message))

const logCmd = async (cmd, ...args) => {
  logAction(`${cmd} ${args.join(' ')}`)
  return null
}

const shLog = {
  cd: dir => logCmd('cd', dir).then(Q(() => shell.cd(dir))),
  mkDir: dir => logCmd('mkdir', dir).then(Q(() => shell.mkdir(dir))),
  mkDirP: dir => logCmd('mkdir -p', dir).then(Q(() => shell.mkdir('-p', dir))),
  cp: (a, b) => logCmd('cp', a, b).then(Q(() => shell.cp(a, b))),
  cpR: (a, b) => logCmd('cp -r', a, b).then(Q(() => shell.cp('-r', a, b))),
  mv: (a, b) => logCmd('mv', a, b).then(Q(() => shell.mv(a, b))),
  lns: (a, b) => logCmd('ln', '-s', a, b).then(Q(() => shell.ln('-s', a, b)))
}


async function cdWrap(dir, f) {
  const pwd = await P(() => shell.pwd())
  await shLog.cd(dir)
  await f()
  return await P(() => shell.cd(pwd)) 
}

const createDir = async pageName => shLog.mkDir(getPagePath(pageName))

const mkDirP = async (pageName, dir) => shLog.mkDirP(path.join(getPagePath(pageName), dir))

const cp = async (pageName, template, fileName, newFileName?: string) =>
  cdWrap(getPagePath(pageName), () => shLog.cp(`../${pageName.split('/').map(s => '../').join('')}landing-pages-templates/${template}/${fileName}`, newFileName || fileName))

const cpRAllFiles = async (pageName, template, dir: string) =>
  cdWrap(getPagePath(pageName), async () => {
    await shLog.mkDirP(dir)
    const copyFrom = path.resolve(`${dir.split('/').map(s => '../').join('')}landing-pages-templates/${template}/${dir}`)
    return cdWrap(dir, 
      () => shLog.cp(`${copyFrom}/*`, '.')
    );
  })

const lnFile = async (pageName, template, fileName) =>
  cdWrap(getPagePath(pageName), () => shLog.lns(`../${pageName.split('/').map(s => '../').join('')}landing-pages-templates/${template}/${fileName}`, fileName))

async function main() {
  const { pageName, confirmPageName } = await inquirer.prompt([
    {
      type: 'input', name: 'pageName', message: 'Name your page:', validate: name =>
          !name                            ? 'Name is mandatory'
        : fs.existsSync(getPagePath(name)) ? 'This landing page already exist!'
        : true
    },
    { type: 'confirm', name: 'confirmPageName', message: ({ pageName }) => `Are you sure you want to create ${pageName}?` }
  ]) as {pageName: string, confirmPageName: boolean};

  if (!confirmPageName) {
    return main()
  } else {

    const {template} = await inquirer.prompt([
      {
        type: "list",
        name: "template",
        message: "Select a template",
        choices: [
          {
            name: 'assrock/v1 (For PIN and MO flows depending on Bupper.)',
            value: 'assrock',
            checked: true
          },
          {
            name: 'Just give me the basics',
            value: 'basic'
          }
        ]
      }]) as {template : "assrock" | "basic"}
    
    if(template == "assrock" || template == "basic") {
      await createDir(pageName);
      await lnFile(pageName, 'scaffolding', 'hotReload.js')
      await lnFile(pageName, 'scaffolding', 'index.tsx')
      await lnFile(pageName, 'scaffolding', 'index.ssr.ts')
      await cp(pageName, 'scaffolding', 'Root.tsx')
      await createDir(`${pageName}/localization`)
      await createDir(`${pageName}/localization/translations`)
      await lnFile(`${pageName}/localization`, 'scaffolding/localization', 'index.tsx')
      await cp(`${pageName}/localization`, 'scaffolding/localization', 'addLocaleData.ts')
      await cp(`${pageName}/localization/translations`, 'scaffolding/localization/translations', 'en.json')
    } 
    if(template == "assrock") {
      await cp(pageName, 'assrock-v1', 'Root.tsx.template', 'Root.tsx')
      // await cpRAllFiles(pageName, 'scaffolding', 'assets/styles')
    }


    console.log('✅', chalk.bgGreen.yellowBright.bold('  Done!'))
    console.log('run: ')
    console.log(`page=${pageName} yarn dev`)

    return null
  }

}

main().then(res => {
  if(!!res) {
    console.log(res)
  }
}).catch(err => {
  console.log(chalk.white.bgRed.bold(`⚠️  There was an error: `))
  console.log(chalk.bgRgb(200, 200, 200).black(err.message))
});