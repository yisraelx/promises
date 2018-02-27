/**
 * @module @promises/times-parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import { OptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let times: number = 3;
 *
 *  timesParallel(times, (time: number) => {
 *      let ms = (times-time) * 3;
 *      return timeout((resolve) => {
 *          console.log(time);
 *          resolve(ms);
 *      }, ms);
 *  }).then((result: number[]) => {
 *      console.log(result);
 *  });
 *
 *  // => 2
 *  // => 1
 *  // => 0
 *  // => [9, 6, 3]
 * ```
 */
function timesParallelStatic<T extends any[]>(times: OptionalPromise<number>, fn: (time: number) => OptionalPromise<T[keyof T & number]>): Promises<T> {
    return Promises.resolve(times).then((times) => {
        return new Promises((resolve, reject) => {
            let length: number = times;
            let index: number = 0;
            let count: number = 0;
            let result = Array(length);

            while (index < length) {
                let thisIndex = index++;
                Promises.resolve().then(() => {
                    let value = fn(thisIndex);
                    return Promises.resolve(value).then((value) => {
                        result[thisIndex] = value;
                        if (++count === length) resolve(result);
                    });
                }).catch(reject);
            }

        });
    }) as Promises<T>;

}

export default timesParallelStatic;

Promises._setOnConstructor('timesParallel', timesParallelStatic);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  let times: number = 3;
         *
         *  Promises.timesParallel(times, (time: number) => {
         *      let ms = (times-time) * 3;
         *      return timeout((resolve) => {
         *          console.log(time);
         *          resolve(ms);
         *      }, ms);
         *  }).then((result: number[]) => {
         *      console.log(result);
         *  });
         *
         *  // => 2
         *  // => 1
         *  // => 0
         *  // => [9, 6, 3]
         * ```
         */
        export let timesParallel: typeof timesParallelStatic;
    }
}
