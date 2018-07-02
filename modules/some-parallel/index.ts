/**
 * @module @promises/some-parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import forEach from '@promises/for-each-parallel';
import createChecksBoolean from '@promises/_create-checks-boolean';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';

export interface ISomeParallel {
    <T extends ArrayLike<any>>(array: IOptionalPromiseArray<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit?: number): Promise<boolean>;
    <T extends object>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit?: number): Promise<boolean>;
}

/**
 * @function
 * @example
 *
 *  let array: any[] = [0, null, true, false];
 *
 *  someParallel(array).then((result: boolean) => {
 *      console.log(result); // result => true
 *  });
 */
let someParallel: ISomeParallel = createChecksBoolean(forEach, (truthy) => {
    return truthy ? Promise.reject(true) : false;
}, true) as ISomeParallel;

export default someParallel;
