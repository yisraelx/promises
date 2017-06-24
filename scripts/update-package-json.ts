import * as fs from 'fs';
import { join } from 'path';
import * as depcheck from 'depcheck';
import * as _ from 'lodash';
import getConfig, { PACKAGE_TYPES } from './utils/config';

const CONFIG = getConfig();
const PACKAGE_JSON_ROOT = require(join(CONFIG.rootPath, 'package.json'));
const PACKAGE_JSON_PATH = join(CONFIG.packagePath, 'package.json');
const PACKAGE_JSON = require(PACKAGE_JSON_PATH);
const PACKAGE_CONSTANTS_PROPERTIES = ['author', 'license', 'keywords', 'homepage', 'repository', 'bugs'];

const DEPENDENCIES = ['@promises/interfaces'];
const VERSION = '0.0.1-PLACEHOLDER';

Promise.all([
    getConstants(CONFIG, PACKAGE_JSON_ROOT),
    getDependencies(CONFIG, PACKAGE_JSON_ROOT)
]).then((result) => {
    result.forEach((updateProps) => {
        _.forEach(updateProps, (value, key) => {
            if (value == null)return;
            PACKAGE_JSON[key] = value;
        });
    });
    return savePackage(PACKAGE_JSON_PATH, PACKAGE_JSON);
});


function savePackage(packageJsonPath: string, packageObject: { [key: string]: any }) {
    let packageString = JSON.stringify(packageObject, null, 2);

    return new Promise((resolve, reject) => {
        fs.writeFile(packageJsonPath, packageString, (error) => {
            if (error) return reject(error);
            resolve();
        });
    });
}

function getConstants(config, packageJsonRoot) {
    return _.pick(packageJsonRoot, PACKAGE_CONSTANTS_PROPERTIES);
}

function getDependencies({packagePath, packageName}, packageJsonRoot) {
    return getUsingDependencies(packagePath).then((dependencies: string[]) => {
        return DEPENDENCIES.filter(name => name !== packageName).concat(dependencies).sort().reduce((result, name) => {
            let type = (_.get(packageJsonRoot, `optionalDependencies.${name}`) && 'optionalDependencies') || (_.get(packageJsonRoot, `peerDependencies.${name}`) && 'peerDependencies') || 'dependencies';
            let version = _.get(packageJsonRoot, `${type}.${name}`) || VERSION;
            _.set(result, `${type}.${name}`, version);
            return result;
        }, {});
    });
}

function getUsingDependencies(packagePath: string) {
    return new Promise<string[]>((resolve) => {
        depcheck(packagePath, {json: true}, (result) => {
            let dependencies = Object.keys(result.using);
            resolve(dependencies);
        });
    });
}