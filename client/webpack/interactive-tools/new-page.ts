import inquirer from 'inquirer';
import * as shell from 'shelljs';
import path from 'path';
import chalk from 'chalk';
import fs, { mkdir } from 'fs';
import dedent from 'dedent-js'
import R from 'ramda'

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

const mergeTranslationJSONFiles = async (pageName, locale, newFile) : Promise<object> => {
  const currentFile = path.resolve(getPagePath(pageName), `localization/translations/${locale}.json`)
  let currentContent = '{}'
  try {
    currentContent = fs.readFileSync(currentFile, 'utf8');
  } catch(ex) {
    // eat it!
  }
  const current = JSON.parse(currentContent);
  const newContent = R.merge(current, require(newFile))
  fs.writeFileSync(currentFile, JSON.stringify(newContent, null, 2), 'utf8')
  return require(currentFile)
} 
async function main() {
  const { pageName } = await inquirer.prompt([
    {
      type: 'input', name: 'pageName', message: 'Name your page:', validate: name =>
          !name                            ? 'Name is mandatory'
        : fs.existsSync(getPagePath(name)) ? 'This landing page already exist!'
        : true
    }
  ]) as {pageName: string};

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
          name: "M-pesa",
          value: "mpesa"
        },
        {
          name: "One Click",
          value: "one-click"
        },
        {
          name: 'Just give me the basics',
          value: 'basic'
        }
      ]
    }]) as {template : "assrock" | "basic" | "mpesa" | "one-click"}

  const {confirm} = await inquirer.prompt([
    { 
      type: 'confirm', 
      name: 'confirm', 
      message: () => 
        dedent`Are you sure you want to create 
                  Page: ${pageName}
                  With Template: ${template}?` 
    }
  ]) as {confirm: boolean}

  if(!confirm)
    return main();
  
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

  if(template == "assrock") {
    await cp(pageName, 'assrock-v1', 'Root.tsx.template', 'Root.tsx')
    // await cpRAllFiles(pageName, 'scaffolding', 'assets/styles')
  }
  if(template == "mpesa") {
    await cp(pageName, 'mpesa', 'Root.tsx.template', 'Root.tsx')
    await mergeTranslationJSONFiles(pageName, 'en', path.resolve(getTemplatePath('mpesa'), 'localization/translations/en.json'))
    // await cpRAllFiles(pageName, 'scaffolding', 'assets/styles')
  }
  if(template == "one-click") {
    await cp(pageName, 'one-click', 'Root.tsx.template', 'Root.tsx')
  }


  console.log('✅', chalk.bgGreen.yellowBright.bold('  Done!'))
  console.log(dedent`
    Your page is ready to be developed.
    To start preview and live module replacement, run: \n`)
  if(template == "mpesa") {
    console.log(`NODE_ENV=development country=ke page=${pageName} yarn dev`)
  } else if (template == "one-click") {
    console.log(`NODE_ENV=development country=gb page=${pageName} yarn dev`)
  }else {
    console.log(`NODE_ENV=development country=gr page=${pageName} yarn dev`)
  }

  return null


}

main().then(res => {
  if(!!res) {
    console.log(res)
  }
}).catch(err => {
  console.log(chalk.white.bgRed.bold(`⚠️  There was an error: `))
  console.log(chalk.bgRgb(200, 200, 200).black(err.message))
});