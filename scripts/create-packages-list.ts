import * as fs from 'fs';
import getPackagesList from './utils/packages-info';

const FILE_NAME: string = 'PACKAGES.md';
const GIT_PACKAGES_PATH: string = 'https://github.com/yisraelx/promises/blob/master';
const NPM_PACKAGES_PATH: string = 'https://npmjs.com/package';
const NAMES = getPackagesList().filter(({packageName}) => {
    let array = packageName.split('/');
    return array[array.length - 1][0] !== '_';
});

let links: string[] = NAMES.map(({packageName, packagePath}) => {
    let git = `[Git](${GIT_PACKAGES_PATH}/${packagePath})`;
    let npm = `[Npm](${NPM_PACKAGES_PATH}/${packageName})`;
    let changelog = `[CHANGELOG](${GIT_PACKAGES_PATH}/${packagePath}/CHANGELOG.md)`;
    return `- **${packageName}** - ${git} - ${npm} - ${changelog}`;
});
let cotext: string = `
# Packages:
${links.join('\n')}
`;

fs.writeFileSync(FILE_NAME, cotext, 'utf8');
