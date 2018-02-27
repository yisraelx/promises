/**
 * @module @promises/keys
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import _keys from '@promises/_keys';

/**
 * @example
 *
 * ```typescript
 *  let object = { foo: 'bar'};
 *  let promises = Promises.resolve(object);
 *
 *  keys(promises).then(keys) => {
 *      console.log(keys); // => ['foo']
 *  });
 * ```
 */
function keys<T>(collection: IOptionalPromise<T>): Promises<string[]>;
function keys<T, R>(collection: IOptionalPromise<T>, fn: (keys: string[]) => IOptionalPromise<R>): Promises<R>;
function keys(collection, fn = v => v) {
    let keys = _keys(collection);
    return Promises.resolve(keys).then(fn);
}

export default keys;

Promises._setOnPrototype('keys', keys);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let object = { foo: 'bar'};
         *  let promises = Promises.resolve(object);
         *
         *  promises.keys((keys) => {
         *      console.log(keys); // => ['foo']
         *  });
         * ```
         */
        keys(this: Promises<T>): Promises<string[]>;
        keys<R>(this: Promises<T>, fn: (keys: string[]) => IOptionalPromise<R>): Promises<R>;
    }
}
