/**
 * @module @promises/for-each-parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import keys from '@pakal/keys';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';

/**
 * @function
 * @example
 *
 *  let array: number[] = [3, 7, 1, 5];
 *
 *  console.log('before');
 *
 *  forEachParallel(array, (value: number) => {
 *      console.log(`start: ${ value }`);
 *
 *      return timeout((resolve) => {
 *          console.log(`end: ${ value }`);
 *          resolve();
 *      }, value);
 *
 *  }).then(() => {
 *      console.log('complete');
 *  });
 *
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
 */
function forEachParallel<T extends ArrayLike<any>>(array: IOptionalPromiseArray<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>, limit?: number): Promise<T>;
function forEachParallel<T extends object>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>, limit?: number): Promise<T>;
function forEachParallel(collection, iteratee: Function = (v => v), limit?) {
    return Promise.resolve(collection).then((collection = []) => {
        return new Promise((resolve, reject) => {
            let objectKeys = !Array.isArray(collection) && keys(collection);
            let { length } = objectKeys ? objectKeys : collection;
            if (!length) return resolve(collection);
            limit = limit && limit > 0 && limit < length ? limit : length;
            let index: number = 0;
            let completed: number = 0;
            let each = (thisIndex) => {
                let key = objectKeys ? objectKeys[thisIndex] : thisIndex;
                let value = collection[key];
                Promise.resolve(value).then((value) => {
                    let result = iteratee(value, key, collection);
                    return Promise.resolve(result).then(() => {
                        completed++;
                        if (index < length) {
                            each(index++);
                        } else if (completed === length) {
                            resolve(collection);
                        }
                    });
                }).catch(reject);
            };
            while (index < limit) {
                each(index++);
            }
        });
    });
}

export default forEachParallel;
