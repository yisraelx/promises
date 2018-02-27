/**
 * @module @promises/times-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

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
function timesSeries<T extends any[]>(times: IOptionalPromise<number>, fn: (time: number) => IOptionalPromise<T[keyof T & number]>): Promise<T> {
    return Promise.resolve(times).then((times: number) => {
        let each = Promise.resolve();
        let length: number = times;
        let index: number = 0;
        let result = Array(length);

        while (index < length) {
            let thisIndex = index++;
            each = each.then(() => {
                let value = fn(thisIndex);
                return Promise.resolve(value).then((value) => {
                    result[thisIndex] = value;
                });
            });
        }

        return each.then(() => {
            return result;
        }) as Promise<T>;
    });

}


export default timesSeries;
