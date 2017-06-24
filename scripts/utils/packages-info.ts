import * as glob from 'glob';
import { join } from 'path';
const WILDCARD = 'modules/**/package.json';

export default function () {
    let filesList = glob.sync(WILDCARD);
    return filesList.map((fileName) => {
        let {name, version} = require(join(process.cwd(), fileName));

        return {
            packageName: name,
            version,
            packagePath: fileName.slice(0, -13)
        };
    });
}