import { join } from 'path';
import { transformFile, TransformOptions } from 'babel-core';
import { writeFileSync } from 'fs';
import getConfig from './utils/config';

import * as ts from 'typescript';

const CONFIG = getConfig();
const ENTRY_FILE_PATH: string = join(CONFIG.packagePath, 'index.js');
interface IVersions {
    options: TransformOptions;
    fileName: string;
    banner?: boolean;
}

let versions: IVersions[] = [
    {
        options: {
            presets: [require('babel-preset-es2015'), require('babel-preset-babili')],
            plugins: [require('babel-plugin-transform-es2015-modules-umd')]
        },
        fileName: 'umd.min.js',
        banner: true
    },
    {
        options: {
            presets: [require('babel-preset-es2015')],
            plugins: [require('babel-plugin-transform-es2015-modules-umd')]
        },
        fileName: 'umd.js',
        banner: true
    }, {
        options: {
            presets: [require('babel-preset-es2015')]
        },
        fileName: 'es5.js'
    }
];


versions.forEach(({options, fileName, banner}) => {
    let dest = join(CONFIG.packagePath, fileName);
    transform(CONFIG.packageName, ENTRY_FILE_PATH, dest, banner, options);
});


function transform(fullName: string, src: string, dest: string, banner, options: TransformOptions) {
    transformFile(src, options, (err, {code}) => {
        if (err) throw err;
        writeFileSync(dest, banner ? createBanner(fullName) + code : code, 'utf8');
    });
}

function createBanner(fullName) {
    return `/**
 * @module ${fullName}
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
`;
}