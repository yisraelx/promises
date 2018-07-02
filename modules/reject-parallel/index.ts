/**
 * @module @promises/reject-parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import forEach from '@promises/for-each-parallel';
import createFilter from '@promises/_create-filter';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';

export interface IRejectParallel {
    <T extends ArrayLike<any>>(array: IOptionalPromiseArray<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit?: number): Promise<T>;
    <T extends object>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit?: number): Promise<T>;
}

/**
 * @function
 * @example
 *
 *  let array: any[] = ['yes', null, 0, true];
 *
 *  rejectParallel(array).then((result: any[]) => {
 *      console.log(result); // => [null, 0]
 *  });
 */
let rejectParallel: IRejectParallel = createFilter(forEach, false) as IRejectParallel;

export default rejectParallel;
