/**
 * @module @promises/filter-parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import forEach from '@promises/for-each-parallel';
import createFilter from '@promises/_create-filter';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';

export interface IFilterParallel {
    <T extends ArrayLike<any>>(array: IOptionalPromiseArray<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit?: number): Promise<T>;
    <T extends object>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit?: number): Promise<T>;
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
 *  filterParallel(array, comparator).then((result: number[])=>{
 *      console.log(result); // result => [0, 2, 4]
 *  });
 */
let filterParallel: IFilterParallel = createFilter(forEach, true) as IFilterParallel;

export default filterParallel;
