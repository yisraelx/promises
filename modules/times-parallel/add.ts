import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import timesParallel from './';

Promises._setOnConstructor('timesParallel', timesParallel);

export default timesParallel;

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
        export function timesParallel<T extends any[]>(times: IOptionalPromise<number>, fn: (time: number) => IOptionalPromise<T[keyof T & number]>): Promises<T>;
    }
}
