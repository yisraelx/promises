/**
 * @module @promises/_create-for-each-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import keys from '@promises/_keys';

/**
 * @function
 * @private
 */
export default function _createForEachSeries(rtl?: boolean) {
    return (collection?, iteratee: Function = v => v) => {
        return Promise.resolve(collection).then((collection = []) => {
            let objectKeys = !Array.isArray(collection) && keys(collection);
            let {length} = objectKeys ? objectKeys : collection;
            let left = 0;
            let right = length - 1;
            let each = Promise.resolve();
            while (left <= right) {
                let current = rtl ? right-- : left++;
                each = each.then(() => {
                    let key = objectKeys ? objectKeys[current] : current;
                    let value = collection[key];
                    return Promise.resolve(value).then((value) => {
                        return iteratee(value, key, collection);
                    });
                });
            }
            return each.then(() => {
                return collection;
            });
        });
    };
}
