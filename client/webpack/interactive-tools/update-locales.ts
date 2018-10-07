import R from 'ramda';
import Ast, {
  ImportDeclaration,
  SyntaxKind,
  ExpressionStatement,
  CallExpression,
  ExportDeclaration,
  SourceFile,
  Statement
} from "ts-simple-ast";
import path from "path";
import fs from 'fs';
import allLocales from "./locales.json"
import * as inquirer from 'inquirer'
import glob from 'glob'
import { translateHash } from '../dev-utils/translate-by-yandex';
import tinyAsyncPool from 'tiny-async-pool';
import dedent from 'dedent-js'

// -- UI functions:

const getPagePath = name => path.resolve(__dirname, `../../src/landing-pages/${name}`)

async function selectLocales(pageName: string, currentLocales: string[]) {
  const { locales, confirm } = await inquirer.prompt([
    {
      type: "checkbox",
      name: "locales",
      message: "Which locales do you want to support?",
      choices: R.toPairs(allLocales).map(([key, l]) => ({
        name: `${l.name} (${key})`,
        value: key,
        checked: currentLocales.some(c => c == key)
      })),
      validate: (locales : string[]) => 
        locales.some(l => l == 'en') ? true : '🇬🇧  You must select English!'
    },
    {
      type: "confirm",
      name: "confirm",
      message: ({ locales }: { locales: string[] }) => {
        const newLangs = locales.filter(l => !currentLocales.some(c => c == l));
        const delLangs = currentLocales.filter(c => !locales.some(l => c == l));
        return dedent`Are you sure you want to 
          + add    ${newLangs.length == 0 ? '(No new languages)' : newLangs.map(l => `${allLocales[l].name} (${l})`).join(' and ')}
          - remove ${delLangs.length == 0 ? '(Nothing)'         : delLangs.map(l => `${allLocales[l].name} (${l})`).join(' and ')}
      and modify page: ${pageName}?
      `
      }
    }
  ]) as {confirm : boolean, locales: string[]};
  if (!confirm) {
    return selectLocales(pageName, currentLocales)
  } else {
    console.log('☑️ selectLocales() completed.'); 
    return locales
  }
}

async function handleMissingTranslations(pageName: string, localesWithMissingTranslations: string[]): Promise<string[]> {
  if(localesWithMissingTranslations.length > 0) {
    const {translationOption} = await inquirer.prompt([
      {
        type: "list",
        name: "translationOption",
        message: dedent`JSON files for these languages are missing.
           ${localesWithMissingTranslations.map(l => `${allLocales[l].name} (${l})`).join(', ')}
        Select an option to proceed:`,
        choices: [
          {
            name: 'Just clonse en.json.',
            value: 'fromEn',
            checked: true
          },
          {
            name: 'Use Yandex to translate en.json.',
            value: 'yandex'
          }
        ]
      }]) as {translationOption : "fromEn" | "yandex"}

    const result = await translationOption == "fromEn"
      ? createTranslationJSONFilesFromEN(pageName, localesWithMissingTranslations)
      : translate(pageName, localesWithMissingTranslations)
    console.log('☑️ handleMissingTranslations() completed.'); 
    return result
  } else {
    console.log('☑️ All selected languages already have a JSON file.')
    return [];
  }
}

async function main() {
  const { pageName } = await inquirer.prompt([
    {
      type: 'input', name: 'pageName', message: 'Which page do you want to modify?', validate: name =>
          !name ? 'Name is mandatory'
        : !fs.existsSync(getPagePath(name)) ? 'This landing page does not exist'
        : true
    }]) as any;
  const { currentLocales, sourceFile, localeStatements } = processPage(pageName);
  const locales = await selectLocales(pageName, currentLocales);

  const localesWithMissingTranslations = await getLocalesWithMissingTranslationJSONFiles(pageName, locales);
  await handleMissingTranslations(pageName, localesWithMissingTranslations)

  const updatedLocaleFile = await modifyAddLocaleDataFile(sourceFile, currentLocales, locales, localeStatements)

  console.log(dedent`☑️ addLocaleData.ts file updated:
  -----
  ${updatedLocaleFile.split('\n').map(x => `     ${x}`).join('\n')}
  ----`)

  return `\n✅ ${locales.join(', ')} locales have been created for page: ${pageName}`
}

// -- lib functions:

async function getLocalesWithMissingTranslationJSONFiles(page: string, locales: string[]) {
  const toPromise = (f) => (...args) => new Promise((resolve, reject) => {
    f(...args, (err, res) => !!err ? reject(err) : resolve(res))
  })
  const root = getPagePath(page)
  const files = <string[]> await toPromise(glob)(
    path.resolve(root , "localization/translations/*.json")
  , {} 
  )
  const missingLocaleJSONS = locales.filter(l => !R.contains(l, files.map(f => path.basename(f).split('.')[0])))
  return missingLocaleJSONS 
}

async function createTranslationJSONFilesFromEN(page: string, locales: string[]) {
  const root = getPagePath(page)
  const en = require(path.resolve(root , "localization/translations/en.json"));
  locales.forEach(l => {
    const content = JSON.stringify(R.map(v => `${l}:: ${v}`)(en), null, 2);
    const filePath = path.resolve(root , `localization/translations/${l}.json`)
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created: ${filePath}`);
  })
  return locales
}

async function translate(pageName: string, locales: string[]) {
  const root = getPagePath(pageName)
  const en = require(path.resolve(root , "localization/translations/en.json"));
  const result = await tinyAsyncPool(1, locales, async l => {
    const translation = await translateHash('en', l, en);
    const content = JSON.stringify(translation, null, 2);
    const filePath = path.resolve(root , `localization/translations/${l}.json`)
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Created: ${filePath}`);
    return l
  })
  return result
}


// -- AST functions:

function processPage(page: string) {
  type ProcessedImport = {
    module: string;
    name: string;
    s: ImportDeclaration;
    kind: SyntaxKind;
    locale?: string;
  }
  
  const ast = new Ast();
  const sourceFile = ast.addExistingSourceFile(
    path.resolve(getPagePath(page) , "localization/addLocaleData.ts")
  );
  
  const processImportDecleration = (s: ImportDeclaration) : ProcessedImport => {
    const lit = s.getModuleSpecifier().getLiteralValue();
  
    const tryMatch = (regex : RegExp) => {
      const match = regex.exec(lit)
      return !!match ? match[1] : null
    } 
  
    const locale = tryMatch(/react\-intl\/locale\-data\/(\w\w)/gm) || tryMatch(/\/translations\/(\w\w).json/)
  
    const name = s.getImportClause().getText()
    if(!!locale) {
      return ({module: lit, name, locale, s, kind: SyntaxKind.ImportDeclaration})
    } else {
      return ({module: lit, name, s, kind: SyntaxKind.ImportDeclaration})
    }
  }
  
  const processExpression = (s: ExpressionStatement, imports: ProcessedImport[]) =>
    s.getExpression().getKind() == SyntaxKind.CallExpression ? processCallExpression(s, s.getExpression() as CallExpression, imports) : null
  
  const processCallExpression = (s : ExpressionStatement, p: CallExpression, imports: ProcessedImport[]) => {
    const args = p.getArguments().map(a => a.getText());
    const fn = p.getExpression().getText();
    const localeImpprt = imports.find(i => !!i.locale && args.some(a => a == i.name))
    return !!localeImpprt
      ? {fn, args, locale: localeImpprt.locale, s}
      : {fn, args, s}
  }
  
  const processExportDecleration = (s: ExportDeclaration, imports: ProcessedImport[]) => {
    const names = s.getNamedExports().map(n => n.getText());
    return names.length == 1 && imports.some(i => i.name == names[0])
      ? {exports: names, locale: names[0], s}
      : {exports: names, s}
  }
  
  
  const statements = sourceFile.getStatements()
  
  const importStatements = statements
    .filter(s => s.getKind() == SyntaxKind.ImportDeclaration)
    .map(s => processImportDecleration(s as ImportDeclaration))
    .filter(s => !!s && !!s.locale);
  const exportStatements = statements
    .filter(s => s.getKind() == SyntaxKind.ExportDeclaration)
    .map(s => processExportDecleration(s as ExportDeclaration, importStatements))
    .filter(s => !!s && !!s.locale);
  const callStatements = statements
    .filter(s => s.getKind() == SyntaxKind.ExpressionStatement)
    .map(s => processExpression(s as ExpressionStatement, importStatements))
    .filter(s => !!s && !!s.locale)
  
  const localeStatements = [...importStatements, ...exportStatements, ...callStatements];
  
  const currentLocales = R.uniq(localeStatements.map(l => l.locale));
  return {currentLocales, sourceFile, localeStatements}
}

function modifyAddLocaleDataFile(sourceFile: SourceFile, currentLocales: string[], localesToSupport: string[], localeStatements: { s: Statement, locale?: string }[]) {
  const missingLocales = localesToSupport.filter(s => !currentLocales.some(l => l == s));

  // add missing langs
  missingLocales.forEach(lang => {
    sourceFile.addImportDeclaration({ defaultImport: `${lang}LocaleData`, moduleSpecifier: `react-intl/locale-data/${lang}` })
    sourceFile.addStatements(`addLocaleData(${lang}LocaleData);`)
    sourceFile.addImportDeclaration({ defaultImport: lang, moduleSpecifier: `./translations/${lang}.json` })
    sourceFile.addStatements(`export {${lang}};`)
  })

  // remove extea langs
  localeStatements.forEach(s => {
    if (!localesToSupport.some(l => l == s.locale)) {
      s.s.remove()
    }
  });

  sourceFile.formatText();
  sourceFile.saveSync();
  return sourceFile.getText();
}

main()
.then(console.log).catch(console.error)