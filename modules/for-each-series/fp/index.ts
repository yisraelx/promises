/**
 * @module @promises/for-each-series/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';
import forEachSeries from '../';

export interface ICurriedForEachSeries {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>, array: IOptionalPromiseArray<T>): Promise<T>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>): (array: IOptionalPromiseArray<T>) => Promise<T>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>, object: IOptionalPromiseDictionary<T>): Promise<T>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>): (object: IOptionalPromiseDictionary<T>) => Promise<T>;
}

/**
 * @function
 * @example
 *
 *  let array: number[] = [3, 7, 1, 5];
 *
 *  console.log('before');
 *
 *  forEachSeries(array, (value: number) => {
 *      console.log(`start: ${ value }`);
 *
 *      return timeout((resolve) => {
 *          console.log(`end: ${ value }`);
 *          resolve();
 *      }, value);
 *
 *  })(array).then(() => {
 *      console.log('complete');
 *  });
 *
 *  console.log('after');
 *
 *  // => before
 *  // => after
 *  // => start 3
 *  // => end 3
 *  // => start 7
 *  // => end 7
 *  // => start 1
 *  // => end 1
 *  // => start 5
 *  // => end 5
 *  // => complete
 */
let curriedForEachSeries: ICurriedForEachSeries = _curry(forEachSeries);

export default curriedForEachSeries;
