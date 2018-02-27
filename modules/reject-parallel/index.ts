/**
 * @module @promises/reject-parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import forEach from '@promises/for-each-parallel';
import createFilter from '@promises/_create-filter';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';

export interface IRejectParallel {
    <T extends ArrayLike<any>>(array: IOptionalPromise<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): Promise<T>;
    <T>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promise<T>;
}

/**
 * @example
 *
 * ```typescript
 *  let array: any[] = ['yes', null, 0, true];
 *
 *  rejectParallel(array).then((result: any[]) => {
 *      console.log(result); // => [null, 0]
 *  });
 * ```
 */
let rejectParallel: IRejectParallel = createFilter(forEach, false) as IRejectParallel;

export default rejectParallel;
