/**
 * @module @promises/for-each-right-series/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';
import forEachRightSeries from '../';

export interface ICurriedForEachRightSeries {
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
 *  forEachRightSeries((value: number) => {
 *      console.log(`start: ${ value }`);
 *
 *      return timeout((resolve) => {
 *          console.log(`end: ${ value }`);
 *          resolve();
 *      }, value);
 *
 *  }, array).then(() => {
 *      console.log('complete');
 *  });
 *
 *  console.log('after');
 *
 *  // => before
 *  // => after
 *  // => start 5
 *  // => end 5
 *  // => start 1
 *  // => end 1
 *  // => start 7
 *  // => end 7
 *  // => start 3
 *  // => end 3
 *  // => complete
 */
let curriedForEachRightSeries: ICurriedForEachRightSeries = _curry(forEachRightSeries);

export default curriedForEachRightSeries;
