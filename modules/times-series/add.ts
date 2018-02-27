import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import timesSeries from './';

Promises._setOnConstructor('timesSeries', timesSeries);

export default timesSeries;

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
        export function timesSeries<T extends any[]>(times: IOptionalPromise<number>, fn: (time: number) => IOptionalPromise<T[keyof T & number]>): Promises<T>;
    }
}
