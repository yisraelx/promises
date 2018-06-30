/**
 * @module @promises/forever
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';

/**
 * @function
 * @example
 *
 *  forever((count: number) => new Promise((resolve, reject) => {
 *   setImmediate(() => {
 *    count >= 5 ? reject('foo') : resolve(++count);
 *   });
 *  }), 0).catch((error: string) => {
 *   console.log(error); // error => 'reject'
 *  });
 */
function forever<T>(iteratee: (previous?: T) => IOptionalPromise<any>, factor?: T): Promise<never> {
    return new Promise((resolve, reject) => {
        let each = (previous?: T) => {
            Promise
                .resolve(previous)
                .then(iteratee)
                .then(each)
                .catch(reject);
        };

        each(factor);
    });
}

export default forever;
