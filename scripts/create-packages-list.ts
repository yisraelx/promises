import { readdirSync, writeFileSync } from 'fs';

let gitModulesPath = 'https://github.com/yisraelx/promises/blob/master/modules';
let packagesList = readdirSync('./modules');
let scope = 'promises';

// remove internal packages
packagesList = packagesList.filter(name => name[0] !== '_');

let packagesListMd: string = packagesList.map(name => {
    let fullName = `@${scope}/${name}`;
    let gitPackagePath = `${gitModulesPath}/${name}`;
    return `- **${fullName}** - [Git](${gitPackagePath}) - [Npm](https://npmjs.com/package/${fullName}) - [CHANGELOG](${gitPackagePath}/CHANGELOG.md)`;
}).join('\n');


let md = `# Packages:
${packagesListMd}
`;

writeFileSync('PACKAGES.md', md, { encoding: 'utf8' });
