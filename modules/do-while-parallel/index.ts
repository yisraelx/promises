/**
 * @module @promises/do-while-parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';
import exec from '@promises/exec';
import whileParallel from '@promises/while-parallel';

/**
 * @example
 *
 * ```typescript
 * let index: number = 0;
 * whileParallel(() => {
 *  console.log(`test ${index}`);
 *  return index++ < 3;
 * }, () => {
 *  let thisIndex = index;
 *  return timeout((resolve) => {
 *   console.log(`iteratee ${thisIndex}`);
 *   resolve();
 *  }, 4 - index);
 * }).then(() => {
 *  console.log('completed');
 * });
 * // => 'test 0'
 * // => 'test 1'
 * // => 'test 2'
 * // => 'test 3'
 * // => 'iteratee 3'
 * // => 'iteratee 2'
 * // => 'iteratee 1'
 * // => 'iteratee 0'
 * // => 'completed'
 * ```
 */
function doWhileParallel(test: () => IOptionalPromise<boolean>, iteratee: () => IOptionalPromise<any> = () => { }, limit: number = Infinity): Promise<void> {
    limit--;
    if (limit <= 0) {
        return exec(iteratee).then(() => {
            return whileParallel(test, iteratee, limit);
        });
    } else {
        return Promise.all([
            exec(iteratee),
            whileParallel(test, iteratee, limit)
        ]).then(() => { });
    }
}

export default doWhileParallel;
