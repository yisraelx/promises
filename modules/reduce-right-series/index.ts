/**
 * @module @promises/reduce-right-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import createReduce from '@promises/_create-reduce';
import { IReduce, IReduceWrapper } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let array: number[] = [0, 1, 2, 3];
 *
 *  reduceRightSeries(array, (sum, num) => Promises.resolve(sum + num)).then((result: number) => {
 *      console.log(result); // => 6
 *  });
 * ```
 */
let reduceRightSeries: IReduce = createReduce(true) as IReduce;

export default reduceRightSeries;

Promises._setOnPrototype('reduceRightSeries', reduceRightSeries);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let array: number[] = [0, 1, 2, 3];
         *  let promises = Promises.resolve(array);
         *
         *  promises.reduceRightSeries((sum, num) => Promises.resolve(sum + num)).then((result: number) => {
         *      console.log(result); // => 6
         *  });
         * ```
         */
        reduceRightSeries: IReduceWrapper<T>;
    }
}
