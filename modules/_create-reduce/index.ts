/**
 * @module @promises/_create-reduce
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import keys from '@promises/_keys';

export default function _createReduce(rtl?: boolean) {
    return function (collection?, iteratee: any = v => v, accumulator?) {
        let init = arguments.length < 3;
        return Promises.resolve(collection).then((collection = []) => {
            let objectKeys = !Array.isArray(collection) && keys(collection);

            let {length} = objectKeys ? objectKeys : collection;
            let left = 0;
            let right = length - 1;
            let each = Promises.resolve(accumulator);
            while (left <= right) {
                let current = rtl ? right-- : left++;
                each = each.then((accumulator) => {
                    let key = objectKeys ? objectKeys[current] : current;
                    let value = collection[key];
                    return Promises.resolve(value).then((value) => {
                        return init ? (init = false, value) : iteratee(accumulator, value, key, collection);
                    });
                });
            }
            return each;
        });
    };
}