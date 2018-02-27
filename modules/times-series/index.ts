/**
 * @module @promises/times-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let times: number = 3;
 *
 *  timesSeries(times, (time: number) => {
 *      let ms = (times-time) * 3;
 *      return timeout((resolve) => {
 *          console.log(time);
 *          resolve(ms);
 *      }, ms);
 *  }).then((result: number[]) => {
 *      console.log(result);
 *  });
 *
 *  // => 0
 *  // => 1
 *  // => 2
 *  // => [9, 6, 3]
 * ```
 */
function timesSeriesStatic<T extends any[]>(times: IOptionalPromise<number>, fn: (time: number) => IOptionalPromise<T[keyof T & number]>): Promises<T> {
    return Promises.resolve(times).then((times: number) => {
        let each = Promises.resolve();
        let length: number = times;
        let index: number = 0;
        let result = Array(length);

        while (index < length) {
            let thisIndex = index++;
            each = each.then(() => {
                let value = fn(thisIndex);
                return Promises.resolve(value).then((value) => {
                    result[thisIndex] = value;
                });
            });
        }

        return each.then(() => {
            return result;
        }) as Promises<T>;
    });

}


export default timesSeriesStatic;

Promises._setOnConstructor('timesSeries', timesSeriesStatic);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  let times: number = 3;
         *
         *  Promises.timesSeries(times, (time: number) => {
         *      let ms = (times-time) * 3;
         *      return timeout((resolve) => {
         *          console.log(time);
         *          resolve(ms);
         *      }, ms);
         *  }).then((result: number[]) => {
         *      console.log(result);
         *  });
         *
         *  // => 0
         *  // => 1
         *  // => 2
         *  // => [9, 6, 3]
         * ```
         */
        export let timesSeries: typeof timesSeriesStatic;
    }
}
