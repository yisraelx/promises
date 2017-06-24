/**
 * @module @promises/for-each-right-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import createForEachSeries from '@promises/_create-for-each-series';
import { IForEach, IForEachWrapper } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let array: number[] = [3, 7, 1, 5];
 *
 *  console.log('before');
 *  forEachRightSeries(array, (value: number) => {
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
 *  // => start 5
 *  // => end 5
 *  // => start 1
 *  // => end 1
 *  // => start 7
 *  // => end 7
 *  // => start 3
 *  // => end 3
 *  // => complete
 * ```
 */
let forEachRightSeries = createForEachSeries(true) as IForEach;

export default forEachRightSeries;

Promises._setOnPrototype('forEachRightSeries', forEachRightSeries);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let array: number[] = [3, 7, 1, 5];
         *  let promises = Promises.resolve(array);
         *
         *  console.log('before');
         *  promises.forEachRightSeries((value: number) => {
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
         *  // => start 5
         *  // => end 5
         *  // => start 1
         *  // => end 1
         *  // => start 7
         *  // => end 7
         *  // => start 3
         *  // => end 3
         *  // => complete
         * ```
         */
        forEachRightSeries: IForEachWrapper<T>;
    }
}