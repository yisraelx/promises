/**
 * @module @promises/reset
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import { OptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let promises: Promises<string> = Promises.resolve<string>('foo');
 *  reset(promises, 'bar').then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 * ```
 * @example
 *
 * ```typescript
 *  let promises: Promises<string> = Promises.reject<string>('foo');
 *  reset(promises, 'bar').then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 * ```
 */
function reset<R>(promise: OptionalPromise<any>, value: OptionalPromise<R>): Promises<R> {
    return Promises.resolve(promise).then(() => value, () => value) as Promises<R>;
}

export default reset;

Promises._setOnPrototype('reset', reset);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.resolve<string>('foo').reset('bar');
         *  promises.then((result: string) => {
         *    console.log(result); // => 'bar'
         *  });
         * ```
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.reject<string>('foo').reset('bar');
         *  promises.then((result: string) => {
         *    console.log(result); // => 'bar'
         *  });
         * ```
         */
        reset<R>(this: Promises<T>, value: OptionalPromise<R>): Promises<R>;
    }
}