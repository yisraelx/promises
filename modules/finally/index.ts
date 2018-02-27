/**
 * @module @promises/finally
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';
import next from '@promises/next';
import error from '@promises/error';

/**
 * @example
 *
 * ```typescript
 *  let promise = Promise.resolve('foo');
 *  finally(promises, () => {
 *      console.log('done'); // => 'done'
 *  });
 * ```
 * @example
 *
 * ```typescript
 *  let promise = Promise.reject('foo');
 *  finally(promises, () => {
 *      console.log('done'); // => 'done'
 *  });
 * ```
 */
function _finally<R>(promise: IOptionalPromise<R>, fn: () => IOptionalPromise<any>): Promise<R> {
    return Promise.resolve(promise).then(
        (value) => next(fn(), value),
        (reason) => error(fn(), reason)
    );
}

export default _finally;
