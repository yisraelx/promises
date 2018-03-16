/**
 * @module @promises/keys
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise, IDictionary } from '@promises/interfaces';
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
function keys(collection: IOptionalPromise<ArrayLike<any> | IDictionary<any>>): Promise<string[]> {
    let keys = _keys(collection);
    return Promise.resolve(keys);
}

export default keys;
