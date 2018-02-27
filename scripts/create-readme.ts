import * as fs from 'fs';
import { join } from 'path';
import * as parseComments from 'parse-comments';
import getConfig, { PACKAGE_TYPES } from './utils/config';

const CONFIG = getConfig();
const LIBRARY = 'Promises';
const GLOBAL_NAME = 'P';
const ENTRY_FILE_PATH: string = join(CONFIG.packagePath, 'index.ts');
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
# Compatibility
${compatibility()}
# Use
${install(CONFIG)}
${useImport(CONFIG)}
${useExample()}
${CONFIG.packageType === PACKAGE_TYPES.GROUP ? `Or ${useGlobal(CONFIG)}` : ''}
# License
${license()}
`;
fs.writeFileSync(README_FILE_PATH, cotext);


function badges({packageName, fromModulesPath}) {
    let str = `[![Source Code](https://img.shields.io/badge/source--code-%3C/%3E-blue.svg)](${PACKAGES_URL}/${fromModulesPath})
[![Version](https://img.shields.io/npm/v/${packageName}.svg)](https://www.npmjs.com/package/${packageName})
[![MIT License](https://img.shields.io/npm/l/${packageName}.svg)](https://github.com/${GIT_USERNAME}/${REPOSITORY_NAME}/blob/master/LICENSE)`;

    return str;
}

function useImportWeb({packageName}) {
    return `\`\`\`html\n<script src="https://unpkg.com/${packageName}/bundle.js"> </script>\n\`\`\``;
}

function compatibility() {
    return `These modules are written in typescript and available in ES5 and ES6 standard, the requirements are a global __Promise__ (native or polyfill).`;
}

function useImport({packageName, subName}) {
    let lib = require(ENTRY_FILE_PATH);
    let defaultName: string = `${capitalize(normalizaName(subName))}`;
    let libKeys = Object.keys(lib);
    if (libKeys.length === 0) return '';
    if (lib.default) {
        if (libKeys.length === 1) return `\`\`\`typescript\n import ${defaultName} from '${packageName}';\n\`\`\``;
        let index = libKeys.indexOf('default');
        libKeys.splice(index, 1);
        libKeys.unshift(`default as ${defaultName}`);
    }
    return `\`\`\`typescript\n import {\n\t${libKeys.join(',\n\t')}\n} from '${packageName}';\n\`\`\``;
}

function useGlobal({packagePath, packageName}) {
    let lib = require(packagePath);
    let libKeys = Object.keys(lib);
    return `
\`\`\`html\n<script src="https://unpkg.com/${packageName}/bundle.js"> </script>\n\`\`\`
\`\`\`typescript\nlet {\n\t${libKeys.join(',\n\t')}\n} = ${GLOBAL_NAME};\n\`\`\``;
}

function useExample() {
    let sourcePath = ENTRY_FILE_PATH;
    let sourceBuffer = fs.readFileSync(sourcePath);
    let source = sourceBuffer.toString();
    let result = parseComments(source);
    return result.map(({example}: { example?: string }) => {
        if (!example) return '';
        return example.replace(/^true/, '');
    }).join('\n');
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

function install({packagePath, packageName}) {
    let packageJsonPath = join(packagePath, 'package.json');
    let packageJson = require(packageJsonPath);
    let types = ['optional', 'peer'].map((key) => {
        let deps = packageJson[`${key}Dependencies`];
        let keys = Object.keys(deps || {});
        if (!keys.length) return '';
        return `\n# and install ${key} dependencies\n$ npm install --save ${keys.join(' ')}`;
    }).join('');
    return `\`\`\`sh\n$ npm install --save ${packageName} ${types}\n\`\`\``;
}

function license() {
    let str = `Copyright © 2017 [Yisrael Eliav](https://github.com/${GIT_USERNAME}),
Licensed under the [MIT license](${REPOSITORY_URL}/blob/master/LICENSE).`;
    return str;
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

