import { rollup, OutputOptions, RollupFileOptions } from 'rollup';
import * as typescript from 'typescript';
import * as tsPlugin from 'rollup-plugin-typescript';
import * as nodeResolve from 'rollup-plugin-node-resolve';
import * as alias from 'rollup-plugin-alias';
import * as cleanUp from 'rollup-plugin-cleanup';
import { uglify } from 'rollup-plugin-uglify';
import { join } from 'path';
import { existsSync } from 'fs';

let packagePath: string = process.cwd();
let packageJson = require(join(packagePath, 'package.json'));
let camelName: string = camelPackageName(packageJson.name);
let isGroup: boolean = /^@.*\/-.*/.test(packageJson.name);
let isInternal: boolean = /^@.*\/_.*/.test(packageJson.name);
let scope: string = 'promises';

let buildVersions = [
    {inputFile: 'index', globalName: 'P', outputFile: 'index.esm', outputFormat: 'es', isBundle: false},
    {inputFile: 'index', globalName: 'P', outputFile: 'index.es6', outputFormat: 'es', isBundle: false, target: 'es6'},
    {inputFile: 'index', globalName: 'P', outputFile: 'bundle.umd', outputFormat: 'umd', isBundle: true, minify: true},
    {inputFile: 'index', globalName: 'P', outputFile: 'bundle.umd', outputFormat: 'umd', isBundle: true},
    {
        inputFile: 'fp/index',
        globalName: 'PF',
        outputFile: 'fp/index.esm',
        outputFormat: 'es',
        isBundle: false
    },
    {
        inputFile: 'fp/index',
        globalName: 'PF',
        outputFile: 'fp/index.es6',
        outputFormat: 'es',
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
    {inputFile: 'fp/index', globalName: 'PF', outputFile: 'fp/bundle.umd', outputFormat: 'umd', isBundle: true},
    {
        inputFile: 'add/index',
        globalName: 'P',
        outputFile: 'add/index.esm',
        outputFormat: 'es',
        isBundle: false
    },
    {
        inputFile: 'add/index',
        globalName: 'P',
        outputFile: 'add/index.es6',
        outputFormat: 'es',
        isBundle: false,
        target: 'es6'
    },
    {
        inputFile: 'add/index',
        globalName: 'P',
        outputFile: 'add/bundle.umd',
        outputFormat: 'umd',
        isBundle: true,
        minify: true
    },
    {inputFile: 'add/index', globalName: 'P', outputFile: 'add/bundle.umd', outputFormat: 'umd', isBundle: true}
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
    let isAdd = inputFile.indexOf('add') !== -1;

    let inputOptions: RollupFileOptions = {
        input: `${inputFile}.ts`,
        plugins: [
            {
                name: 'import-root-file',
                resolveId(id, filePath) {
                    if (id === '../') {
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
        inputOptions.external = (id) => peerKeys.indexOf(id) !== -1 || /(@promises\/.*)/.test(id);
        outputOptions.globals = Object.keys(dependencies).reduce((globals, name) => {
            let key = `${isInternal ? '_' : ''}${globalName}.${camelPackageName(name)}`;
            globals[key] = key;
            return globals;
        }, {});
    } else if (camelName !== 'core') {
        inputOptions.external = ['@promises/core'].concat(peerKeys);
        outputOptions.globals = peerKeys.reduce((globals, name) => {
            globals[name] = name;
            return globals;
        }, {'@promises/core': 'P.Promises'});
    }


    // for global use
    if (!isGroup && outputFormat === 'umd' && !isAdd && camelName !== 'core') {
        outputOptions.outro = `exports.${camelName} = exports.default;`;
    }

    let roll = await rollup(inputOptions);

    await roll.write(outputOptions);

}


function camelPackageName(name: string) {
    return name.replace(/^.*\/[-_]?/, '').replace(/-[a-z]/g, (letter) => letter[1].toUpperCase());
}

function createBanner(source: string) {
    let {name, license} = packageJson;
    source = source.replace(/[\/]?index/, '');
    return `/**
* @module ${name}${source !== '' ? `/${source}` : ''}
* @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
* @license ${license}
*/`;
}
