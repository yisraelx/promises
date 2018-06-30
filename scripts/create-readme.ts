import * as Handlebars from 'handlebars';
import * as parseComments from 'parse-comments';
import { join } from 'path';
import { existsSync, readFileSync, writeFileSync } from 'fs';

let rootPackage = process.cwd();
let packageJson = require(join(rootPackage, 'package.json'));
let name = packageJson.name.replace(/^.*\/[-_]?/, '');
let camelName = camelPackageName(packageJson.name);
let isGroup = /^@promises\/-.*/.test(packageJson.name);
let isInternal = /^@promises\/_.*/.test(packageJson.name);

let data = {
    repo: {
        url: 'https://github.com/yisraelx/promises'
    },
    package: {
        fullName: packageJson.name,
        subName: packageJson.name.replace(/^.*\//, ''),
        name,
        description: packageJson.description
    },
    isGroup,
    isInternal,
    hasUse: camelName === 'interfaces',
    index: getExamples('./index.ts'),
    fp: {
        has: existsSync('./fp/index.ts'),
        examples: getExamples('./fp/index.ts')
    },
    add: {
        has: existsSync('./add.ts'),
        examples: getExamples('./add.ts')
    }
};

Handlebars.registerHelper('keys', (global, path) => {
    let lib = require(join(rootPackage, path));
    let keys = Object.keys(lib);

    if (Boolean(global)) {
        keys = name === 'core' ? ['Promises'] : keys.reduce((keys, key) => {
            if (lib[key]) {
                keys.push(key);
            }
            return keys;
        }, []);
    }

    let defaultIndex = keys.indexOf('default');
    if (defaultIndex > -1) {
        let importName = isInternal ? `_${camelName}` : camelName === 'core' ? 'Promises' : camelName;
        keys[defaultIndex] = !Boolean(global) ? `default as ${importName}` : importName;
    }
    return keys.join(',\n ');
});

Handlebars.registerHelper('examples', (examples = []) => {
    examples = examples.map(example => `\`\`\`typescript
${example.replace(/^true[\n]*/, '')}
\`\`\``);
    return examples.length ? `
**Examples**
${examples.join('\n')}
` : '';
});

Handlebars.registerPartial('header', `
# {{ package.fullName }}
[![Source Code](https://img.shields.io/badge/%3C%2F%3E-source_code-blue.svg)]({{repo.url}}/blob/master/packages/{{package.subName}})
[![Version](https://img.shields.io/npm/v/{{package.fullName}}.svg)](https://www.npmjs.com/package/{{package.fullName}})
[![MIT License](https://img.shields.io/npm/l/{{package.fullName}}.svg)]({{repo.url}}/blob/master/LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/min/{{package.fullName}}.svg)](https://bundlephobia.com/result?p={{package.fullName}})

{{#if package.description}}
**{{ package.description }}**
{{/if}}
`);

Handlebars.registerPartial('use', `
## Use

**Module**
\`\`\`sh
$ npm install --save {{package.fullName}}
\`\`\`
\`\`\`typescript
import {
 {{keys false './'}}
} from '{{package.fullName}}';
\`\`\`
{{#unless isInternal}}

**Browser**
\`\`\`html
<script src="https://unpkg.com/{{package.fullName}}/bundle.umd.min.js"></script>
\`\`\`
\`\`\`typescript
let {
 {{keys true './'}}
} = P;
\`\`\`

{{{examples index}}}
{{/unless}}

{{#if fp.has}}
### Functional programming

**Module**
\`\`\`sh
$ npm install --save {{package.fullName}}
\`\`\`
\`\`\`typescript
import {
 {{keys false './fp'}}
} from '{{package.fullName}}/fp';
\`\`\`

**Browser**
\`\`\`html
<script src="https://unpkg.com/{{package.fullName}}/fp/bundle.umd.min.js"></script>
\`\`\`
\`\`\`typescript
let {
 {{keys true './fp'}}
} = PF;
\`\`\`

{{{examples fp.examples}}}
{{/if}}

{{#if add.has}}
### Wrapper

**Module**
\`\`\`sh
$ npm install --save {{package.fullName}}{{#unless isGroup}} @promises/core{{/unless }}
\`\`\`
\`\`\`typescript
import Promises from '@promises/core';
import '{{package.fullName}}/add';
\`\`\`

**Browser**
\`\`\`html
<script src="https://unpkg.com/@promises/-all/bundle.umd.min.js"></script>
\`\`\`
\`\`\`typescript
let {
 Promises
} = P;
\`\`\`

{{{examples add.examples}}}
{{/if}}
`);

Handlebars.registerPartial('compatibility', `
## Compatibility
These modules are written in typescript and available in ES5 and ES6 standard, the requirements are a global __Promise__ (native or polyfill).
`);

Handlebars.registerPartial('license', `
## License
Copyright © 2017 [Yisrael Eliav](https://github.com/yisraelx),
Licensed under the [MIT license]({{repo.url}}/blob/master/LICENSE).
`);

let template = Handlebars.compile(`
{{> header }}
{{#unless hasUse}}
{{> use }}
{{/unless}}
{{> compatibility }}
{{> license }}
`);

let md = template(data);

writeFileSync('./README.md', md, {encoding: 'utf8'});

function camelPackageName(name: string) {
    return name.replace(/^.*\/[-_]?/, '').replace(/-[a-z]/g, (letter) => letter[1].toUpperCase());
}

function getExamples(path: string) {
    try {
        let source = readFileSync(path).toString();
        let [data] = parseComments(source).filter((block) => block['example']);
        let {examples, example} = data;
        let result = [examples, example].reduce((data, value) => {
            value = Array.isArray(value) ? value : (value as string).split(/[\n\s]+,[\n]{2}/g);
            return data.concat(value);
        }, []);

        return result.length ? result : null;
    } catch (e) {

    }
}
