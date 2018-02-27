/**
 * @module @promises/for-each-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import createForEachSeries from '@promises/_create-for-each-series';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';

export interface IForEachSeries {
    <T extends ArrayLike<any>>(array: IOptionalPromise<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>): Promise<T>;
    <T>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>): Promise<T>;
}

/**
 * @example
 *
 * ```typescript
 *  let array: number[] = [3, 7, 1, 5];
 *
 *  console.log('before');
 *  forEachSeries(array, (value: number) => {
 *      console.log(`start: ${ value }`);
 *      return timeout((resolve) => {
 *          console.log(`end: ${ value }`);
 *          resolve();
 *      }, value);
 *  }).then(() => {
 *      console.log('complete');
 *  });
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
 * ```
 */
let forEachSeries: IForEachSeries = createForEachSeries() as IForEachSeries;

export default forEachSeries;
