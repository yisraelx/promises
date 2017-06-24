import * as fs from 'fs';

export default function(paths: string): string[] {
    return searchPackages(paths).reduce((result, name) => {
        if (name[0] === '@') {
            let scopePackages = searchPackages(`${paths}/${name}`).map(subName => `${name}/${subName}`)
            return result.concat(scopePackages);
        } else {
            result.push(name);
            return result;
        }
    }, []);
}

function searchPackages(paths: string): string[] {
    let list = fs.readdirSync(paths);
    let result = list.reduce((result, name) => {
        let stat = fs.statSync(`${paths}/${name}`);
        if (stat.isDirectory()) {
            result.push(name);
        }
        return result;
    }, []);
    return result;
}
