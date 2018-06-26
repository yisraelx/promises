/**
 * @module @promises/some-series/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';
import someSeries from '../';

export interface ISomeSeries {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>,  array: IOptionalPromise<T>): Promise<boolean>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): (array: IOptionalPromise<T>) => Promise<boolean>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, object: IOptionalPromiseDictionary<T>): Promise<boolean>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>):  (object: IOptionalPromiseDictionary<T>) => Promise<boolean>;
}

/**
 * @example
 *
 * ```typescript
 *  let array: any[] = [0, null, true, false];
 *
 *  someSeries(Boolean)(array).then((result: boolean) => {
 *      console.log(result); // result => true
 *  });
 * ```
 */
export default _curry(someSeries, {length: 2}) as ISomeSeries;
