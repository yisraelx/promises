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
 * @function
 * @example
 *
 *  let comparator = (value: any) => {
 *      return Promise.resolve(Boolean(value))
 *  };
 *
 *  let array: any[] = [true, 1, Promise.resolve(null), 'yes'];
 *
 *  everySeries(comparator)(array).then((result: boolean)=>{
 *      console.log(result) // result => false
 *  });
 */
let curriedEverySeries: IEverySeries = _curry(everySeries);

export default curriedEverySeries;
