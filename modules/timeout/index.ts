/**
 * @module @promises/timeout
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import { IExecutor } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let promises: Promises<string> = timeout<string>((resolve, reject)=>{
 *      resolve('foo')
 *  }, 3000);
 *
 *  promises.then((result: string)=>{
 *      console.log(result); // result => 'foo'
 *  });
 * ```
 */
function timeoutStatic<T>(executor: IExecutor<T>, ms?: number): Promises<T> {
    return new Promises((resolve, reject) => {
        setTimeout(() => {
            executor(resolve, reject);
        }, ms);
    });
}

export default timeoutStatic;

Promises._setOnConstructor('timeout', timeoutStatic);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.timeout<string>((resolve, reject)=>{
         *      resolve('foo')
         *  }, 3000);
         *
         *  promises.then((result: string)=>{
         *      console.log(result); // result => 'foo'
         *  });
         * ```
         */
        export let timeout: typeof timeoutStatic;
    }
}
