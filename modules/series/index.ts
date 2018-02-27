/**
 * @module @promises/series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import map from '@promises/map-series';
import { IOptionalPromise, IDictionary } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let fn = (id: string, ms: number) => () => timeout((resolve) => {
 *      console.log(id);
 *      resolve(id);
 *  }, ms);
 *  let functions = [
 *      fn('zero', 7),
 *      fn('one', 3),
 *      fn('two', 5)
 *  ];
 *
 *  series(functions).then((result) => {
 *      console.log(result);
 *  });
 *
 *  // => 'zero'
 *  // => 'one'
 *  // => 'two'
 *  // => ['zero', 'one', 'two']
 * ```
 */
function seriesStatic<R>(array: (() => IOptionalPromise<R>)[]): Promises<R[]>;
function seriesStatic<R extends ArrayLike<any>>(array: (() => IOptionalPromise<R[keyof R & number]>)[]): Promises<R>;
function seriesStatic<R>(object: IDictionary<(() => IOptionalPromise<R>)>): Promises<IDictionary<R>>;
function seriesStatic<R extends IDictionary<any>>(object: IDictionary<(() => IOptionalPromise<R[keyof R]>)>): Promises<R>;
function seriesStatic(functions) {
    return map(functions, (fn) => fn());
}

export default seriesStatic;

Promises._setOnConstructor('series', seriesStatic);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  let fn = (id: string, ms: number) => () => timeout((resolve) => {
         *      console.log(id);
         *      resolve(id);
         *  }, ms);
         *  let functions = {
         *      zero: fn(0, 7),
         *      one: fn(1, 3),
         *      two: fn(2, 5),
         *  };
         *
         *  Promises.series(functions).then((result) => {
         *      console.log(result);
         *  });
         *
         *  // => 0
         *  // => 1
         *  // => 2
         *  // => { zero: 0, one: 1, two: 2}
         * ```
         */
        export let series: typeof seriesStatic;
    }
}
