/**
 * @module @promises/filter-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import forEach from '@promises/for-each-series';
import createFilter from '@promises/_create-filter';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';

export interface IFilterSeries {
    <T extends ArrayLike<any>>(array: IOptionalPromiseArray<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): Promise<T>;
    <T extends object>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promise<T>;
}

/**
 * @function
 * @example
 *
 *  let comparator = (value: number) => {
 *      return value % 2 === 0;
 *  };
 *
 *  let array = [0, 1, 2, 3];
 *
 *  filterSeries(array, comparator).then((result: number[])=>{
 *      console.log(result); // [0,2]
 *  });
 */
let filterSeries: IFilterSeries = createFilter(forEach, true) as IFilterSeries;

export default filterSeries;
