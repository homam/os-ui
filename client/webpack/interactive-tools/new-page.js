const inquirer = require('inquirer');
const shell = require('shelljs');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs')

const getPagePath = name => path.resolve(__dirname, `../../src/landing-pages/${name}`)

const P = async f => {
  const { code, stderr, stdout } = f()
  if (code != 0) {
    const err = new Error(stderr)
    err.code = code
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
  cp: (a, b) => logCmd('cp', a, b).then(Q(() => shell.cp(a, b))),
  lns: (a, b) => logCmd('ln', '-s', a, b).then(Q(() => shell.ln('-s', a, b)))
}


async function cdWrap(dir, f) {
  const pwd = await P(() => shell.pwd())
  await shLog.cd(dir)
  await f()
  return await P(() => shell.cd(pwd)) 
}

const createDir = async pageName => shLog.mkDir(getPagePath(pageName))

const cp = async (pageName, template, fileName) =>
  cdWrap(getPagePath(pageName), () => shLog.cp(`../${pageName.split('/').map(s => '../').join('')}landing-pages-templates/${template}/${fileName}`, fileName))

const lnFile = async (pageName, template, fileName) =>
  cdWrap(getPagePath(pageName), () => shLog.lns(`../${pageName.split('/').map(s => '../').join('')}landing-pages-templates/${template}/${fileName}`, fileName))

async function main() {
  const { pageName, confirmPageName } = await inquirer.prompt([
    {
      type: 'input', name: 'pageName', message: 'Name your page:', validate: name =>
        !name ? 'Name is mandatory'
          : fs.existsSync(getPagePath(name)) ? 'This landing page already exist'
            : true
    },
    { type: 'confirm', name: 'confirmPageName', message: ({ pageName }) => `Are you sure you want to create ${pageName}?` }
  ]);

  if (!confirmPageName) {
    return main()
  } else {

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