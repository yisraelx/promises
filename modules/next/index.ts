/**
 * @module @promises/next
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let promises: Promises<string> = Promises.resolve<string>('foo');
 *  next(promises, 'bar').then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 * ```
 * @example
 *
 * ```typescript
 *  let promises: Promises<string> = Promises.reject<string>('foo');
 *  next(promises, 'bar').then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 * ```
 */
function next<R>(promise: IOptionalPromise<any>, value: IOptionalPromise<R>): Promises<R> {
    return Promises.resolve(promise).then(() => {
        return value;
    }) as Promises<R>;
}

export default next;

Promises._setOnPrototype('next', next);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.resolve<string>('foo').next('bar');
         *  promises.then((result: string) => {
         *    console.log(result); // => 'bar'
         *  });
         * ```
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.reject<string>('foo').next('bar');
         *  promises.then((result: string) => {
         *    console.log(result); // => 'bar'
         *  });
         * ```
         */
        next<R>(this: Promises<T>, value: IOptionalPromise<R>): Promises<R>;
    }
}
