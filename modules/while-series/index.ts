/**
 * @module @promises/while-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';
import exec from '@promises/exec';
import doWhileSeries from '@promises/do-while-series';

/**
 * @function
 * @example
 *
 *  let index: number = 0;
 *
 *  whileSeries(() => {
 *    console.log(`test ${index}`);
 *    return index++ < 3;
 *  }, () => timeout((resolve) => {
 *    console.log(`iteratee ${index}`);
 *    resolve();
 *  }, 4 - index)).then(() => {
 *    console.log('completed');
 *  });
 *
 *  // => 'test 0'
 *  // => 'iteratee 1'
 *  // => 'test 1'
 *  // => 'iteratee 2'
 *  // => 'test 2'
 *  // => 'iteratee 3'
 *  // => 'test 3'
 *  // => 'completed'
 */
function whileSeries(test: () => IOptionalPromise<boolean>, iteratee: () => IOptionalPromise<any> = () => { }): Promise<void> {
    return exec(test).then((isPass: boolean) => {
        if (isPass) {
            return doWhileSeries(test, iteratee);
        }
    });
}

export default whileSeries;
