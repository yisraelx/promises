/**
 * @module @promises/_create-checks-boolean
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

export default function _createChecksBoolean(iterator, check, is) {
    return (collection?, iteratee: any = v => v, limit?) => {
        return iterator(collection, (value, index, collection) => {
            let result = iteratee(value, index, collection);
            return Promise.resolve(result).then(check);
        }, limit).then(() => {
            return !is;
        }).catch((result) => {
            return (result === is) ? Promise.resolve(result) : Promise.reject(result);
        });
    };
}
