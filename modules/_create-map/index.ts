/**
 * @module @promises/_create-map
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';

export default function _createMap(iterator) {
    return (collection?, iteratee: any = v => v) => {
        return Promises.resolve(collection).then((collection = []) => {
            let result = Array.isArray(collection) ? Array(collection.length) : {};
            return iterator(collection, (value, key, collection) => {
                let getNewValue = iteratee(value, key, collection);
                return Promises.resolve(getNewValue).then((newValue) => {
                    result[key] = newValue;
                });
            }).then(() => {
                return result;
            });
        });
    };
}