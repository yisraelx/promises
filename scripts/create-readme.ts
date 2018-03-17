import * as fs from 'fs';
import {join} from 'path';
import * as parseComments from 'parse-comments';
import getConfig, {PACKAGE_TYPES} from './utils/config';

const CONFIG = getConfig();
const LIBRARY = 'Promises';
const GLOBAL_NAME = 'P';
const ENTRY_FILE_PATH: string = join(CONFIG.packagePath, 'index.ts');
const ADD_FILE_PATH = join(CONFIG.packagePath, 'add.ts');
const FP_FILE_PATH = join(CONFIG.packagePath, 'fp.ts');
const README_FILE_PATH = join(CONFIG.packagePath, 'README.md');
const GIT_USERNAME: string = 'yisraelx';
const NPM_USERNAME: string = 'yisraelx';
const REPOSITORY_NAME: string = 'promises';
const REPOSITORY_URL: string = `https://github.com/${GIT_USERNAME}/${REPOSITORY_NAME}`;
const PACKAGES_URL: string = `${REPOSITORY_URL}/blob/master/modules`;

let cotext: string = `
# ${CONFIG.packageName}
${badges(CONFIG)}

**${description(CONFIG)}**

## Use
${use(CONFIG)}

## Compatibility
${compatibility()}

## License
${license()}`;
fs.writeFileSync(README_FILE_PATH, cotext);

function badges({packageName, fromModulesPath}) {
    return `[![Source Code](https://img.shields.io/badge/%3C/%3E-source--code-blue.svg)](${PACKAGES_URL}/${fromModulesPath})
[![Version](https://img.shields.io/npm/v/${packageName}.svg)](https://www.npmjs.com/package/${packageName})
[![MIT License](https://img.shields.io/npm/l/${packageName}.svg)](https://github.com/${GIT_USERNAME}/${REPOSITORY_NAME}/blob/master/LICENSE)`;
}

function useImportWeb({packageName}) {
    return `\`\`\`html\n<script src="https://unpkg.com/${packageName}/bundle.js"> </script>\n\`\`\``;
}

function compatibility() {
    return `These modules are written in typescript and available in ES5 and ES6 standard, the requirements are a global __Promise__ (native or polyfill).`;
}

function use(CONFIG) {
    let str = `${install(CONFIG)}
${useImport(CONFIG)}
${useExample(ENTRY_FILE_PATH)}`;
    if (CONFIG.packageType === PACKAGE_TYPES.GROUP) {
        str += `\nOr\n${useGlobal(CONFIG)}`;
    } else if (CONFIG.packageType === PACKAGE_TYPES.REGULAR && fs.existsSync(ADD_FILE_PATH)) {
        str += `\n**Wrapper:**\n${useWrapper(CONFIG)}`;
    }

    if (CONFIG.packageType === PACKAGE_TYPES.REGULAR && fs.existsSync(FP_FILE_PATH)) {
        str += `\n**Functional programming**:\n${useFP(CONFIG)}`;
    }

    return str;
}

function useWrapper(CONFIG) {
    return `${install(CONFIG, true)}
\`\`\`ts
 import ${LIBRARY} from '@promises/core';
 import '${CONFIG.packageName}/add';
\`\`\`
${useExample(ADD_FILE_PATH)}`;
}

function useFP(CONFIG) {
    return `${install(CONFIG)}
\`\`\`ts
 import ${defaultName(CONFIG.subName)} from '${CONFIG.packageName}/fp';
\`\`\`
${useExample(FP_FILE_PATH)}`;
}

function useImport({packageName, subName}) {
    let lib = require(ENTRY_FILE_PATH);
    let libKeys = Object.keys(lib);
    if (libKeys.length === 0) return '';
    if (lib.default) {
        if (libKeys.length === 1) return `\`\`\`ts\n import ${defaultName(subName)} from '${packageName}';\n\`\`\``;
        let index = libKeys.indexOf('default');
        libKeys.splice(index, 1);
        libKeys.unshift(`default as ${defaultName}`);
    }
    return `\`\`\`ts\n import {\n\t${libKeys.join(',\n\t')}\n} from '${packageName}';\n\`\`\``;
}

function useGlobal({packagePath, packageName}) {
    let lib = require(packagePath);
    let libKeys = Object.keys(lib);
    return `
\`\`\`html\n<script src="https://unpkg.com/${packageName}/bundle.js"> </script>\n\`\`\`
\`\`\`ts\nlet {\n\t${libKeys.join(',\n\t')}\n} = ${GLOBAL_NAME};\n\`\`\``;
}

function useExample(sourcePath) {
    let sourceBuffer = fs.readFileSync(sourcePath);
    let source = sourceBuffer.toString();
    let result = parseComments(source);
    return result.reduce((examples, {example}: { example?: string }) => {
        if (example) {
            example = example.replace(/^true\n\n/, '').replace(/,\n\n/gm, '\n');
            examples.push(example);
        }
        return examples;
    }, []).join('\n').trim();
}

function description({subName, fromModulesPath}) {
    let subLink = `[${capitalize(normalizaName(subName), false)}](${PACKAGES_URL}/${fromModulesPath})`;
    let libraryLink = `[${LIBRARY}](${REPOSITORY_URL})`;
    switch (subName[0]) {
        case '_':
            return `${subLink} is a internal package from ${libraryLink} library`;
        case '-':
            return `${subLink} is a group of packages of ${libraryLink} library`;
        default:
            return `${subLink} is package from ${libraryLink} library`;
    }
}

function install({packagePath, packageName}, isAdd?: boolean) {
    let packageJsonPath = join(packagePath, 'package.json');
    let packageJson = require(packageJsonPath);
    let types = ['peer'].map((key) => {
        let deps = packageJson[`${key}Dependencies`];
        let keys = Object.keys(deps || {});
        if (!keys.length) return '';
        return `\n# and install ${key} dependencies\n$ npm install --save ${keys.join(' ')}`;
    }).join('');
    return `\`\`\`sh\n$ npm install --save ${packageName}${isAdd ? ' @promises/core' : ''} ${types}\n\`\`\``;
}

function license() {
    return `Copyright © 2017 [Yisrael Eliav](https://github.com/${GIT_USERNAME}),
Licensed under the [MIT license](${REPOSITORY_URL}/blob/master/LICENSE).`;
}

function defaultName(subName: string) {
    return capitalize(normalizaName(subName));
}

function normalizaName(str: string) {
    return `${str}`.replace(/[-_]/gm, ' ').replace(/(^\s|\s$)/gm, '');
}

function capitalize(str: string = '', func: boolean = true) {
    return str.split(' ').map((word: string, index: number) => {
        let first = (func && index === 0) ? word[0].toLowerCase() : word[0].toUpperCase();
        return first + word.slice(1).toLowerCase();
    }).join('');
}
