/**
 * @module @promises/keys
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise, IDictionary } from '@promises/interfaces';
import _keys from '@promises/_keys';

/**
 * @function
 * @example
 *
 *  let object: {[key: string]: string} = { foo: 'bar'};
 *  let promise: Promise<{[key: string]: string}> = Promise.resolve(object);
 *
 *  keys(promises).then(keys: string[]) => {
 *      console.log(keys); // => ['foo']
 *  });
 */
function keys(collection: IOptionalPromise<ArrayLike<any> | object>): Promise<string[]> {
    return Promise.resolve(collection).then((collection: ArrayLike<any> | object) => {
        let keys: string[] = _keys(collection);
        return Promise.resolve(keys);
    });
}

export default keys;
