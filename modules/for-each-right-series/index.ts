/**
 * @module @promises/for-each-right-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import createForEachSeries from '@promises/_create-for-each-series';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';

export interface IForEachRightSeries {
    <T extends ArrayLike<any>>(array: IOptionalPromiseArray<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>): Promise<T>;
    <T extends object>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>): Promise<T>;
}

/**
 * @function
 * @example
 *
 *  let array: number[] = [3, 7, 1, 5];
 *
 *  console.log('before');
 *
 *  forEachRightSeries(array, (value: number) => {
 *      console.log(`start: ${ value }`);
 *
 *      return timeout((resolve) => {
 *          console.log(`end: ${ value }`);
 *          resolve();
 *      }, value);
 *
 *  }).then(() => {
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
let forEachRightSeries: IForEachRightSeries = createForEachSeries(true) as IForEachRightSeries;

export default forEachRightSeries;
