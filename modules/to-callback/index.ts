/**
 * @module @promises/to-callback
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *
 *  toCallback(promise, (error: any, result: string) => {
 *      console.log(error); // error => null
 *      console.log(result); // result => 'foo'
 *  });
 * ```
 */
function toCallback<T, R>(value: IOptionalPromise<T>, callback: (error?: any, value?: T) => IOptionalPromise<R>): Promise<R> {
    return Promise
        .resolve(value)
        .then((value) => {
            return callback(null, value);
        }, callback);
}

export default toCallback;
