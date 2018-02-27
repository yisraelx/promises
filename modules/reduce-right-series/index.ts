/**
 * @module @promises/reduce-right-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import createReduce from '@promises/_create-reduce';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';

export interface IReduceSeries {
    <T extends ArrayLike<any>>(array: IOptionalPromise<T>, iteratee?: (accumulator: T[keyof T & number], value: T[keyof T & number], index: number, array: T) => IOptionalPromise<T[keyof T & number]>, accumulator?: T[keyof T & number]): Promise<T[keyof T & number]>;
    <T extends ArrayLike<any>, R>(array: IOptionalPromise<T>, iteratee?: (accumulator: R, value: T[keyof T & number], index: number, array: T) => IOptionalPromise<R>, accumulator?: R): Promise<R>;
    <T>(object: IOptionalPromiseDictionary<T>, iteratee?: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>, accumulator?: T[keyof T]): Promise<T[keyof T]>;
    <T, R>(object: IOptionalPromiseDictionary<T>, iteratee?: (accumulator: R, value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>, accumulator?: R): Promise<R>;
}

/**
 * @example
 *
 * ```typescript
 *  let array: number[] = [0, 1, 2, 3];
 *
 *  reduceRightSeries(array, (sum, num) => Promise.resolve(sum + num)).then((result: number) => {
 *      console.log(result); // => 6
 *  });
 * ```
 */
let reduceRightSeries: IReduceSeries = createReduce(true) as IReduceSeries;

export default reduceRightSeries;
