/**
 * @module @promises/filter-series/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';
import filterSeries from '../';

export interface IFilterSeries {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, array: IOptionalPromise<T>): Promise<T>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): (array: IOptionalPromise<T>) => Promise<T>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, object: IOptionalPromiseDictionary<T>): Promise<T>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): (object: IOptionalPromiseDictionary<T>) => Promise<T>;
}

/**
 * @function
 * @example
 *
 *  let comparator = (value: number) => {
 *      return value % 2 === 0;
 *  };
 *
 *  let array = Array.from({length:5}, (value, index) => index);
 *
 *  filterSeries(comparator)(array).then((result: number[])=>{
 *      console.log(result); // result => [0, 2, 4]
 *  });
 */
let curriedFilterSeries: IFilterSeries = _curry(filterSeries);

export default curriedFilterSeries;
