/**
 * @module @promises/finally
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let promises = Promises.resolve('foo');
 *  finally(promises, () => {
 *      console.log('done'); // => 'done'
 *  });
 * ```
 * @example
 *
 * ```typescript
 *  let promises = Promises.reject('foo');
 *  finally(promises, () => {
 *      console.log('done'); // => 'done'
 *  });
 * ```
 */
function _finally<R>(promise: IOptionalPromise<any>, fn: () => IOptionalPromise<any>): Promises<R> {
    let onBoth = (value) => {
        let result = fn();
        return Promise.resolve(result).then(() => value);
    };
    return Promises.resolve(promise).then(onBoth, onBoth) as Promises<R>;
}

export default _finally;

Promises._setOnPrototype('finally', _finally);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises = Promises.resolve('foo');
         *  promises.finally(() => {
         *      console.log('done'); // => 'done'
         *  });
         * ```
         * @example
         *
         * ```typescript
         *  let promises = Promises.reject('foo');
         *  promises.finally(() => {
         *      console.log('done'); // => 'done'
         *  });
         * ```
         */
        finally(this: Promises<T>, fn: () => IOptionalPromise<any>): Promises<T>;
    }
}
