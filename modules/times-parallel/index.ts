/**
 * @module @promises/times-parallel
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
function timesParallel<T extends any[]>(times: IOptionalPromise<number>, fn: (time: number) => IOptionalPromise<T[keyof T & number]>): Promise<T> {
    return Promise.resolve(times).then((times) => {
        return new Promise((resolve, reject) => {
            let length: number = times;
            let index: number = 0;
            let count: number = 0;
            let result = Array(length);

            while (index < length) {
                let thisIndex = index++;
                Promise.resolve().then(() => {
                    let value = fn(thisIndex);
                    return Promise.resolve(value).then((value) => {
                        result[thisIndex] = value;
                        if (++count === length) resolve(result);
                    });
                }).catch(reject);
            }

        });
    }) as Promise<T>;

}

export default timesParallel;
