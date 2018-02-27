/**
 * @module @promises/_create-filter
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

export default function _createFilter(iterator, is) {
    return (collection?, iteratee: any = v => v) => {
        return Promise.resolve(collection).then((collection = []) => {
            let isArray = Array.isArray(collection);
            let result = isArray ? [] : {};
            let count = 0;
            return iterator(collection, (value, key, collection) => {
                let isPass = iteratee(value, key, collection);
                return Promise.resolve(isPass).then((isPass) => {
                    if (!!isPass === is) result[isArray ? count++ : key] = value;
                });
            }).then(() => {
                return result;
            });
        });
    };
}
