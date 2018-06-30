/**
 * @module @promises/finally
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';
import next from '@promises/next';
import error from '@promises/error';

/**
 * @function
 * @example
 *
 *  let promise = Promise.resolve('foo');
 *
 *  finally(promise, () => {
 *      console.log('done'); // => 'done'
 *  });
 *
 * @example
 *
 *  let promise = Promise.reject('foo');
 *
 *  finally(promise, () => {
 *      console.log('done'); // => 'done'
 *  });
 */
function _finally<R>(promise: IOptionalPromise<R>, fn: () => IOptionalPromise<any>): Promise<R> {
    return Promise.resolve(promise).then(
        (value) => next(fn(), value),
        (reason) => error(fn(), reason)
    );
}

export default _finally;
