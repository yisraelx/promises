/**
 * @module @promises/some-series/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';
import someSeries from '../';

export interface ICurriedSomeSeries {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>,  array: IOptionalPromiseArray<T>): Promise<boolean>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): (array: IOptionalPromiseArray<T>) => Promise<boolean>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, object: IOptionalPromiseDictionary<T>): Promise<boolean>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>):  (object: IOptionalPromiseDictionary<T>) => Promise<boolean>;
}

/**
 * @function
 * @example
 *
 *  let array: any[] = [0, null, true, false];
 *
 *  someSeries(Boolean)(array).then((result: boolean) => {
 *      console.log(result); // result => true
 *  });
 */
let curriedSomeSeries: ICurriedSomeSeries = _curry(someSeries);

export { __ } from '@promises/_curry';
export default curriedSomeSeries;
