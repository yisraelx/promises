import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';
import filterSeries from './';

export interface IFilterSeries {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, array: IOptionalPromise<T>): Promise<T>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): (array: IOptionalPromise<T>) => Promise<T>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, object: IOptionalPromiseDictionary<T>): Promise<T>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): (object: IOptionalPromiseDictionary<T>) => Promise<T>;
}

/**
 * @example
 *
 * ```typescript
 *  let comparator = (value: number) => {
 *      return value % 2 === 0;
 *  };
 *
 *  let array = Array.from({length:5}, (value, index) => index);
 *
 *  filterSeries(comparator)(array).then((result: number[])=>{
 *      console.log(result); // result => [0, 2, 4]
 *  });
 * ```
 */
export default _curry(filterSeries, {length: 2}) as IFilterSeries;
