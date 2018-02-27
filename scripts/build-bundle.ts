import * as webpack from 'webpack';
import { Configuration } from 'webpack';
import { join } from 'path';
import { TsConfigPathsPlugin } from 'awesome-typescript-loader';
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import getConfig, { PACKAGE_TYPES } from './utils/config';

const LIBRARY_NAME = 'P';
const CONFIG = getConfig();
const ENTRY_FILE_PATH: string = join(CONFIG.packagePath, 'index.ts');
const DEST_FILE_NAME: string = 'bundle';
const COMPILER_OPTIONS = {
    baseUrl: CONFIG.packagesPath,
    paths: {
        '@promises/*': [
            './*'
        ]
    }
};

let config = {
    entry: {
        [DEST_FILE_NAME]: ENTRY_FILE_PATH,
        [`${DEST_FILE_NAME}.min`]: ENTRY_FILE_PATH
    },
    output: {
        path: CONFIG.packagePath,
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    resolve: {
        mainFields: ['main'],
        plugins: [
            new TsConfigPathsPlugin(COMPILER_OPTIONS)
        ],
        extensions: ['.ts']
    },

    externals: {
        rxjs: {
            commonjs: 'rxjs',
            commonjs2: 'rxjs',
            amd: 'rxjs',
            root: 'Rx'
        }
    } as any,
    devtool: 'source-map',
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true,
            test: /\.min.js$/,
        }),
        new webpack.BannerPlugin({
            banner: createBanner(CONFIG.packageName),
            raw: true,
            entryOnly: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                options: {
                    transpileOnly: true,
                    silent: true
                }
            }
        ]
    }
} as Configuration;

if (PACKAGE_TYPES.GROUP === CONFIG.packageType) {
    config.output['library'] = LIBRARY_NAME;
}

webpack(config, (error) => {
    if (error)throw error;
});
export default config;

function createBanner(fullName) {
    return `/**
 * @module ${fullName}
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
`;
}
