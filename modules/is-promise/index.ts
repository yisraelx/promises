/**
 * @module @promises/is-promise
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';

/**
 * @example
 *
 * ```typescript
 *  let promises = Promises.resolve('foo');
 *  console.log(isPromise(promises)); // => true
 *  console.log(Promises.isPromise('foo')); // => false
 * ```
 */
function isPromiseStatic(x: any): boolean {
    return !!x && typeof x.then === 'function';
}

export default isPromiseStatic;

Promises._setOnConstructor('isPromise', isPromiseStatic, false);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  let promises = Promises.resolve('foo');
         *  console.log(Promises.isPromise(promises)); // => true
         *  console.log(Promises.isPromise('foo')); // => false
         * ```
         */
        export let isPromise: typeof isPromiseStatic;
    }
}
