/**
 * @module @promises/_create-checks-boolean
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';

export default function _createChecksBoolean(iterator, check, is) {
    return (collection?, iteratee: any = v => v) => {
        return iterator(collection, (value, index, collection) => {
            let result = iteratee(value, index, collection);
            return Promises.resolve(result).then(check);
        }).then(() => {
            return !is;
        }).catch((result) => {
            return (result === is) ? Promises.resolve(result) : Promises.reject(result);
        });
    };
}
