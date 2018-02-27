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
function timesParallel<T extends any[]>(times: IOptionalPromise<number>, fn: (time: number) => IOptionalPromise<T[keyof T & number]>, limit?: number): Promise<T> {
    return Promise.resolve(times).then((times) => {
        return new Promise((resolve, reject) => {
            if (!times || times <= 0) return resolve([]);
            let result = Array(times);
            limit = limit && limit > 0 && limit < times ? limit : times;
            let index: number = 0;
            let completed: number = 0;

            let each = (thisIndex: number) => {
                Promise.resolve(thisIndex).then(fn).then((value) => {
                    result[thisIndex] = value;
                    completed++;
                    if (index < times) {
                        each(index++);
                    } else if (completed === times) {
                        resolve(result);
                    }
                }).catch(reject);
            };

            while (index < limit) {
                each(index++);
            }

        });
    }) as Promise<T>;
}

export default timesParallel;
