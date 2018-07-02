/**
 * @module @promises/reject-series/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';
import rejectSeries from '../';

export interface ICurriedRejectSeries {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, array: IOptionalPromiseArray<T>): Promise<T>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): (array: IOptionalPromiseArray<T>) => Promise<T>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, object: IOptionalPromiseDictionary<T>): Promise<T>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): (object: IOptionalPromiseDictionary<T>) => Promise<T>;
}

/**
 * @function
 * @example
 *
 *  let array: any[] = ['yes', null, 0, true];
 *  let promise: Promise<any[]> = Promise.resolve(array);
 *
 *  rejectSeries(void 0, promise).then((result: any[]) => {
 *      console.log(result); // => [null, 0]
 *  });
 */
let curriedRejectSeries: ICurriedRejectSeries = _curry(rejectSeries);

export default curriedRejectSeries;
