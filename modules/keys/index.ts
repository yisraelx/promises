/**
 * @module @promises/keys
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';
import _keys from '@promises/_keys';

/**
 * @example
 *
 * ```typescript
 *  let object = { foo: 'bar'};
 *  let promise: Promise<{[key: string]: string}> = Promise.resolve(object);
 *
 *  keys(promises).then(keys: string[]) => {
 *      console.log(keys); // => ['foo']
 *  });
 * ```
 */
function keys<T>(collection: IOptionalPromise<T>): Promise<string[]>;
function keys<T, R>(collection: IOptionalPromise<T>, fn: (keys: string[]) => IOptionalPromise<R>): Promise<R>;
function keys(collection, fn = v => v) {
    let keys = _keys(collection);
    return Promise.resolve(keys).then(fn);
}

export default keys;
