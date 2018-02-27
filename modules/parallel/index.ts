/**
 * @module @promises/parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import map from '@promises/map-parallel';
import { IOptionalPromise, IDictionary } from '@promises/interfaces';

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
 *  parallel(functions).then((result) => {
 *      console.log(result);
 *  });
 *
 *  // => 1
 *  // => 2
 *  // => 0
 *  // => { zero: 0, one: 1, two: 2}
 * ```
 */
function parallelStatic<R>(array: (() => IOptionalPromise<R>)[]): Promises<R[]>;
function parallelStatic<R extends ArrayLike<any>>(array: (() => IOptionalPromise<R[keyof R & number]>)[]): Promises<R>;
function parallelStatic<R>(object: IDictionary<(() => IOptionalPromise<R>)>): Promises<IDictionary<R>>;
function parallelStatic<R extends IDictionary<any>>(object: IDictionary<(() => IOptionalPromise<R[keyof R]>)>): Promises<R>;
function parallelStatic(functions) {
    return map(functions, (fn) => fn());
}

export default parallelStatic;

Promises._setOnConstructor('parallel', parallelStatic);

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
         *  let functions = [
         *      fn('zero', 7),
         *      fn('one', 3),
         *      fn('two', 5)
         *  ];
         *
         *  Promises.parallel(functions).then((result) => {
         *      console.log(result);
         *  });
         *
         *  // => 'one'
         *  // => 'two'
         *  // => 'zero'
         *  // => ['zero', 'one', 'two']
         * ```
         */
        export let parallel: typeof parallelStatic;
    }
}
