import { relative, join, sep } from 'path';

const PACKAGES_DIR_NAME = 'modules';

export enum PACKAGE_TYPES{
    REGULAR,
    INTERNAL,
    GROUP
}

export default function () {
    let packagePath = process.cwd();
    let [rootPath, fromModulesPath] = packagePath.split(`${sep}${PACKAGES_DIR_NAME}${sep}`);
    let packagesPath = join(rootPath, PACKAGES_DIR_NAME);
    let fromRootPath = `${PACKAGES_DIR_NAME}/${fromModulesPath}`;
    let packageName = process.env.LERNA_PACKAGE_NAME;
    let nameArray = packageName.split('/');
    let scopeName = (nameArray.length === 2) ? nameArray.shift() : null;
    let subName = nameArray.pop();
    let packageType;

    switch (subName[0]) {
        case '_':
            packageType = PACKAGE_TYPES.INTERNAL;
            break;
        case '-':
            packageType = PACKAGE_TYPES.GROUP;
            break;
        default:
            packageType = PACKAGE_TYPES.REGULAR;
    }

    return {
        rootPath,
        fromModulesPath,
        fromRootPath,
        packagesPath,
        packagePath,
        packageType,
        packageName,
        scopeName,
        subName
    };

}
