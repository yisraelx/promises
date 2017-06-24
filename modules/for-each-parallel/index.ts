/**
 * @module @promises/for-each-parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import keys from '@promises/_keys';
import {
    IForEach, IForEachWrapper
} from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let array: number[] = [3, 7, 1, 5];
 *
 *  console.log('before');
 *  forEachParallel(array, (value: number) => {
 *      console.log(`start: ${ value }`);
 *      return timeout((resolve) => {
 *          console.log(`end: ${ value }`);
 *          resolve();
 *      }, value);
 *  }).then(() => {
 *      console.log('complete');
 *  });
 *  console.log('after');
 *
 *  // => before
 *  // => after
 *  // => start 3
 *  // => start 7
 *  // => start 1
 *  // => start 5
 *  // => end 1
 *  // => end 3
 *  // => end 5
 *  // => end 7
 *  // => complete
 * ```
 */
let forEachParallel: IForEach = function (collection, iteratee: any = v => v) {
    return Promises.resolve(collection).then((collection = []) => {
        return new Promises((resolve, reject) => {
            let objectKeys = !Array.isArray(collection) && keys(collection);
            let { length } = objectKeys ? objectKeys : collection;
            if (!length) return resolve(collection);
            let index: number = 0;
            let count: number = 0;
            while (index < length) {
                let key = objectKeys ? objectKeys[index++] : index++;
                let value = collection[key];
                Promises.resolve(value).then((value) => {
                    let result = iteratee(value, key, collection);
                    return Promises.resolve(result).then(() => {
                        if (++count === length) resolve(collection);
                    });
                }).catch(reject);
            }
        });
    });
} as IForEach;

export default forEachParallel;

Promises._setOnPrototype('forEachParallel', forEachParallel);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let array: number[] = [3, 7, 1, 5];
         *  let promises = Promises.resolve(array);
         *
         *  console.log('before');
         *  promises.forEachParallel((value: number) => {
         *      console.log(`start: ${ value }`);
         *      return timeout((resolve) => {
         *          console.log(`end: ${ value }`);
         *          resolve();
         *      }, value);
         *  }).then(() => {
         *      console.log('complete');
         *  });
         *  console.log('after');
         *
         *  // => before
         *  // => after
         *  // => start 3
         *  // => start 7
         *  // => start 1
         *  // => start 5
         *  // => end 1
         *  // => end 3
         *  // => end 5
         *  // => end 7
         *  // => complete
         * ```
         */
        forEachParallel: IForEachWrapper<T>;
    }
}