import * as fs from 'fs';
import { join } from 'path';
import * as depcheck from 'depcheck';
import * as _ from 'lodash';
import getConfig from './utils/config';

const CONFIG = getConfig();
const PACKAGE_JSON_ROOT = require(join(CONFIG.rootPath, 'package.json'));
const PACKAGE_JSON_PATH = join(CONFIG.packagePath, 'package.json');
const PACKAGE_JSON = require(PACKAGE_JSON_PATH);
const PACKAGE_CONSTANTS_PROPERTIES = ['author', 'license', 'keywords', 'homepage', 'repository', 'bugs'];

const IGNORE_DEPENDENCIES = ['@promises/interfaces'];

let step = Promise.resolve();

_.forEach([
    getConstants,
    updateExternalDependencies,
    checkAndRemoveDependencies
], (fn) => {
    step = step.then(() => {
        return fn();
    });
});

step.then(() => {
    return savePackage(PACKAGE_JSON_PATH, PACKAGE_JSON);
});

function getConstants() {
    let constants = _.pick(PACKAGE_JSON_ROOT, PACKAGE_CONSTANTS_PROPERTIES);
    _.merge(PACKAGE_JSON, constants);
}

function updateExternalDependencies() {
    _.forEach([
        'dependencies',
        'devDependencies',
        'optionalDependencies',
        'peerDependencies'
    ], type => {
        let dependencies = PACKAGE_JSON[type];
        if (dependencies) {
            _.forEach(dependencies, (version, name) => {
                let rootVersion = _.get(PACKAGE_JSON_ROOT, `${type}.${name}`);
                if (rootVersion) _.set(dependencies, name, rootVersion);
            });
        }
    });
}

function checkAndRemoveDependencies() {
    let {packagePath, packageName} = CONFIG;
    return depcheck(packagePath, {json: true, ignoreMatches: IGNORE_DEPENDENCIES}).then(result => {
        _.unset(PACKAGE_JSON, result.dependencies || []);
        _.unset(PACKAGE_JSON, result.devDependencies || []);
        if (result.missing.length) {
            console.log(`Missing dependencies in package ${packageName}:\n${JSON.stringify(result.missing, null, 1)}`);
            process.exit(1);
        }
    });
}


function savePackage(packageJsonPath: string, packageObject: { [key: string]: any }) {
    let packageString = JSON.stringify(packageObject, null, 2);

    return new Promise((resolve, reject) => {
        fs.writeFile(packageJsonPath, `${packageString}\n`, (error) => {
            if (error) return reject(error);
            resolve();
        });
    });
}
