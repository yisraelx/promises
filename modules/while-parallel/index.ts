/**
 * @module @promises/while-parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';
import exec from '@promises/exec';

/**
 * @function
 * @example
 *
 *  let index: number = 0;
 *
 *  whileParallel(() => {
 *   console.log(`test ${index}`);
 *   return index++ < 3;
 *  }, () => {
 *   let thisIndex = index;
 *   return timeout((resolve) => {
 *    console.log(`iteratee ${thisIndex}`);
 *    resolve();
 *   }, 4 - index);
 *  }).then(() => {
 *   console.log('completed');
 *  });
 *
 *  // => 'test 0'
 *  // => 'test 1'
 *  // => 'test 2'
 *  // => 'test 3'
 *  // => 'iteratee 3'
 *  // => 'iteratee 2'
 *  // => 'iteratee 1'
 *  // => 'completed'
 */
function whileParallel(test: () => IOptionalPromise<boolean>, iteratee: () => IOptionalPromise<any> = () => { }, limit: number = Infinity): Promise<void> {
    limit--;
    return new Promise((resolve, reject) => {
        let count = 0;
        let completed = 0;
        let isStop = false;
        let onReject = (error: any) => {
            isStop = true;
            reject(error);
        };
        let each = () => {
            if (isStop) {
                if (count === completed) {
                    resolve();
                }
            } else {
                exec(test).then((isPass: boolean) => {
                    if (isPass && !isStop) {
                        count++;
                        exec(iteratee).then(() => {
                            completed++;
                            if (limit <= 0 || isStop) {
                                each();
                            }
                        }).catch(onReject);
                        if (limit > 0) {
                            limit--;
                            each();
                        }
                    } else {
                        isStop = true;
                        each();
                    }
                }).catch(onReject);
            }
        };

        each();
    });
}

export default whileParallel;
