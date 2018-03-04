/**
 * @module @promises/do-while-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';
import exec from '@promises/exec';


/**
 * @example
 *
 * ```typescript
 * let index: number = 0;
 * doWhileSeries(() => {
 *  console.log(`test ${index}`);
 *  return index++ < 3;
 * }, () => timeout((resolve) => {
 *  console.log(`iteratee ${index}`);
 *  resolve();
 * }, 4 - index)).then(() => {
 *  console.log('completed');
 * });
 * // => 'iteratee 0'
 * // => 'test 0'
 * // => 'iteratee 1'
 * // => 'test 1'
 * // => 'iteratee 2'
 * // => 'test 2'
 * // => 'iteratee 3'
 * // => 'test 3'
 * // => 'completed'
 * ```
 */
function doWhileSeries(test: () => IOptionalPromise<boolean>, iteratee: () => IOptionalPromise<any> = () => { }): Promise<void> {
    return new Promise((resolve, reject) => {
        let each = () => {
            exec(iteratee).then(() => {
                return exec(test).then((isPass: boolean) => {
                    isPass ? each() : resolve();
                });
            }).catch(reject);
        };

        each();
    });
}

export default doWhileSeries;
