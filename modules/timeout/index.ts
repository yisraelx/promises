/**
 * @module @promises/timeout
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IExecutor } from '@promises/interfaces';

/**
 * @function
 * @example
 *
 *  let promise: Promise<string> = timeout<string>((resolve, reject)=>{
 *      resolve('foo')
 *  }, 3000);
 *
 *  promise.then((result: string)=>{
 *      console.log(result); // result => 'foo'
 *  });
 */
function timeout<T>(executor: IExecutor<T>, ms?: number): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            executor(resolve, reject);
        }, ms);
    });
}

export default timeout;
