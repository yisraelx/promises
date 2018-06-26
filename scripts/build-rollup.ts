import { rollup, OutputOptions, RollupFileOptions } from 'rollup';
import * as typescript from 'typescript';
import * as tsPlugin from 'rollup-plugin-typescript';
import * as nodeResolve from 'rollup-plugin-node-resolve';
import * as alias from 'rollup-plugin-alias';
import * as cleanUp from 'rollup-plugin-cleanup';
import * as postProcess from 'rollup-plugin-postprocess';
import { uglify } from 'rollup-plugin-uglify';
import { join } from 'path';
import * as assert from 'assert';
import { existsSync, readFileSync } from 'fs';

let packagePath: string = process.cwd();
let packageJson = require(join(packagePath, 'package.json'));
let camelName: string = camelPackageName(packageJson.name);
let isGroup: boolean = /^@.*\/-.*/.test(packageJson.name);
let isInternal: boolean = /^@.*\/_.*/.test(packageJson.name);
let scope: string = 'promises';

let buildVersions = [
    {inputFile: 'index', globalName: 'P', outputFile: 'index.es6', outputFormat: 'cjs', isBundle: false, target: 'es6'},
    {inputFile: 'index', globalName: 'P', outputFile: 'bundle.umd', outputFormat: 'umd', isBundle: true, minify: true},
    {inputFile: 'index', globalName: 'P', outputFile: 'bundle.umd', outputFormat: 'umd', isBundle: true},
    {
        inputFile: 'fp/index',
        globalName: 'PF',
        outputFile: 'fp/index.es6',
        outputFormat: 'cjs',
        isBundle: false,
        target: 'es6'
    },
    {
        inputFile: 'fp/index',
        globalName: 'PF',
        outputFile: 'fp/bundle.umd',
        outputFormat: 'umd',
        isBundle: true,
        minify: true
    },
    {inputFile: 'fp/index', globalName: 'PF', outputFile: 'fp/bundle.umd', outputFormat: 'umd', isBundle: true}
];

buildVersions.reduce(async (dfd: Promise<any>, options) => {
    let {inputFile} = options;
    if (existsSync(`${inputFile}.ts`)) {
        await build(options);
    }
}, Promise.resolve()).catch((error) => {
    console.error(error);
    process.exit(1);
});

async function build({inputFile, globalName, outputFile, outputFormat, target = 'es5', isBundle = false, minify = false}) {
    let inputOptions: RollupFileOptions = {
        input: `${inputFile}.ts`,
        plugins: [
            {
                name: 'import-root-file',
                resolveId(id, filePath) {
                    if (id === './') {
                        return filePath.replace(/add.ts/, 'index.ts');
                    } else if (id === '../') {
                        filePath = filePath.replace('index.ts', '');
                        return join(filePath, '..', 'index.ts');
                    } else {
                        return null;
                    }
                }
            },
            alias({
                [`@${scope}`]: join(process.cwd(), '..'),
                resolve: ['.ts', `/index.ts`]
            }),
            tsPlugin({
                importHelpers: true,
                tsconfig: false,
                target,
                typescript,
                include: ['../**/*.ts'],
            }),
            nodeResolve({jsnext: true, main: true}),
            cleanUp({comments: 'none', extensions: ['.ts']})
        ]
    };

    let outputOptions: OutputOptions = {
        banner: createBanner(inputFile),
        sourcemap: true,
        interop: false,
        exports: 'named',
        extend: true,
        file: `${outputFile}${minify ? '.min' : ''}.js`,
        format: outputFormat,
        name: globalName
    };

    if (minify) {
        inputOptions.plugins.push(
            uglify({output: {comments: false, preamble: createBanner(inputFile)}})
        );
    }

    let {peerDependencies = {}} = packageJson;
    let peerKeys = Object.keys(peerDependencies);

    if (!isBundle) {
        let {dependencies = {}} = packageJson;
        inputOptions.external = (id) => peerKeys.indexOf(id) !== -1 || /(@promises\/.*|.\/add.ts)/.test(id);
        outputOptions.globals = Object.keys(dependencies).reduce((globals, name) => {
            let key = `${isInternal ? '_' : ''}${globalName}.${camelPackageName(name)}`;
            globals[key] = key;
            return globals;
        }, {});
    } else {
        inputOptions.external = peerKeys;
        outputOptions.globals = peerKeys.reduce((globals, name) => {
            globals[name] = name;
            return globals;
        }, {});
        inputOptions.plugins.push(
            postProcess([
                [/(exports.|var )Promises =[\s]+\(function/, '$1Promises = exports.Promises || (function'],
                [/exports.Promises = Function/, 'exports.Promises || Function'],
                [/exports.Promises = \(Promises/, 'exports.Promises = exports.Promises || (Promises']
            ])
        );
    }


    // for global use
    if (!isGroup && outputFormat === 'umd') {
        let key = camelName;
        let value = camelName;
        if (isInternal) {
            key = `_${camelName}`;
        } else if (camelName === 'finally') {
            value = `_${camelName}`;
        } else if (camelName === 'core') {
            key = value = 'Promises';
        }

        outputOptions.outro = `exports.${key} = ${value};`;
    }

    let roll = await rollup(inputOptions);

    await roll.write(outputOptions);

    // for prevent replace and override error
    if (outputFormat === 'umd' && !isInternal) {
        await testBundle(outputFile, globalName);
    }

}


function camelPackageName(name: string) {
    return name.replace(/^.*\/[-_]?/, '').replace(/-[a-z]/g, (letter) => letter[1].toUpperCase());
}

function createBanner(source: string) {
    let {name, license} = packageJson;
    source = source.replace(/[\/]?index/, '');
    return `/**
* @module ${name}${source !== '' ? `/${source}` : ''}
* @copyright © 2018 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
* @license ${license}
*/`;
}

function loadToGlobal(outputFile) {
    // for umd global
    let exports = void 0;
    let code = readFileSync(`${outputFile}.js`).toString();
    return (eval as any)(code);
}

function testBundle(outputFile, globalName) {
    let isFp = outputFile.indexOf('fp') !== -1;

    let emptyScope = {rxjs: {}};
    loadToGlobal.call(emptyScope, outputFile);
    assert.ok(typeof emptyScope[globalName] === 'object', `it should set ${globalName} on empty scope`);
    if (!isGroup && camelName !== 'core') {
        assert.ok(typeof emptyScope[globalName][camelName] === 'function', `${camelName} in ${globalName} should be function in emptyScope`);
    } else if (!isFp) {
        assert.ok(typeof emptyScope[globalName].Promises === 'function', `it should set Promises on emptyScope`);
    }

    let overrideScope = {rxjs: {}};
    loadToGlobal.call(overrideScope, outputFile);
    let old = overrideScope[globalName];

    loadToGlobal.call(overrideScope, outputFile);
    assert.ok(typeof overrideScope[globalName] === 'object', `it should not set ${globalName} on override scope`);
    assert.equal(old, overrideScope[globalName]);
    if (!isGroup && camelName !== 'core') {
        assert.ok(typeof overrideScope[globalName][camelName] === 'function', `${camelName} in ${globalName} should to be function in overrideScope`);
    } else if (!isFp) {
        assert.equal(old.Promises, overrideScope[globalName].Promises, `it should not set Promises on emptyScope`);
    }

}
