/**
 * @module @promises/every-series/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';
import everySeries from '../';

export interface IEverySeries {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>,  array: IOptionalPromise<T>): Promise<boolean>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): (array: IOptionalPromise<T>) => Promise<boolean>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, object: IOptionalPromiseDictionary<T>): Promise<boolean>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>):  (object: IOptionalPromiseDictionary<T>) => Promise<boolean>;
}

/**
 * @example
 *
 * ```typescript
 *  let comparator = (value) => {
 *      return Promise.resolve(Boolean(value))
 *  };
 *
 *  let array: any[] = [true, 1, Promise.resolve(null), 'yes'];
 *
 *  everySeries(comparator)(array).then((result: boolean)=>{
 *      console.log(result) // result => false
 *  });
 * ```
 */
export default _curry(everySeries, {length: 2}) as IEverySeries;
