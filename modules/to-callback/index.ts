/**
 * @module @promises/to-callback
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';


/**
 * @example
 *
 * ```typescript
 *  let promises: Promises<string> = Promises.resolve<string>('foo');
 *
 *  toCallback(promises, (error: any, result: string) => {
 *      console.log(error); // error => void 0
 *      console.log(result); // result => 'foo'
 *  })
 * ```
 */
function toCallback<T, R>(promise: Promises<T>, callback: (error: any, value?: T) => R): Promises<R> {
    return (Promises as any)
        .resolve(promise)
        .then((value) => {
            return callback(null, value);
        })
        .catch(callback);
}

export default toCallback;

Promises._setOnPrototype('toCallback', toCallback);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.resolve<string>('foo');
         *
         *  promises.toCallback((error: any, result: string) => {
         *      console.log(error); // error => void 0
         *      console.log(result); // result => 'foo'
         *  })
         * ```
         */
        toCallback<R>(this: Promises<T>, callback: (error: any, value?: T) => R): Promises<R>;
    }
}
