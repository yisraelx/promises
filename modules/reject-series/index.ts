/**
 * @module @promises/reject-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import forEach from '@promises/for-each-series';
import createFilter from '@promises/_create-filter';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';

export interface IRejectSeries {
    <T extends ArrayLike<any>>(array: IOptionalPromise<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): Promise<T>;
    <T>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promise<T>;
}

/**
 * @example
 *
 * ```typescript
 *  let array: any[] = ['yes', null, 0, true];
 *  let promise: Promise<any[]> = Promise.resolve(array);
 *
 *  rejectSeries(promise).then((result: any[]) => {
 *      console.log(result); // => [null, 0]
 *  });
 * ```
 */
let rejectSeries: IRejectSeries = createFilter(forEach, false) as IRejectSeries;

export default rejectSeries;
