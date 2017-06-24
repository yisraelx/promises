/**
 * @module @promises/reduce-series
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
 *  reduceSeries(array, (sum, num) => Promises.resolve(sum + num)).then((result: number) => {
 *      console.log(result); // => 6
 *  });
 * ```
 */
let reduceSeries: IReduce = createReduce() as IReduce;

export default reduceSeries;

Promises._setOnPrototype('reduceSeries', reduceSeries);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let array: number[] = [0, 1, 2, 3];
         *  let promises = Promises.resolve(array);
         *
         *  promises.reduceSeries((sum, num) => Promises.resolve(sum + num)).then((result: number) => {
         *      console.log(result); // => 6
         *  });
         * ```
         */
        reduceSeries: IReduceWrapper<T>;
    }
}
