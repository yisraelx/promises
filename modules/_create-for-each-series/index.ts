/**
 * @module @promises/_create-for-each-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import keys from '@promises/_keys';

export default function _createForEachSeries(rtl?: boolean) {
    return (collection?, iteratee: any = v => v) => {
        return Promises.resolve(collection).then((collection = []) => {
            let objectKeys = !Array.isArray(collection) && keys(collection);
            let {length} = objectKeys ? objectKeys : collection;
            let left = 0;
            let right = length - 1;
            let each = Promises.resolve();
            while (left <= right) {
                let current = rtl ? right-- : left++;
                each = each.then(() => {
                    let key = objectKeys ? objectKeys[current] : current;
                    let value = collection[key];
                    return Promises.resolve(value).then((value) => {
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
