/**
 * @module @promises/timer
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';

/**
 * @example
 *
 * ```typescript
 *  let promises: Promises<string> = Promises.resolve<string>('foo').delay(3000);
 *
 *  timer(promises, 1500, 'error: timeout').catch((error: string) => {
 *      console.log(error); // error => 'error: timeout'
 *  })
 * ```
 */
function timer<T>(promise: Promises<T>, ms?: number, error?: any): Promises<T> {
    return new Promises((resolve, reject) => {
        let isExecute = false;
        setTimeout(() => {
            if (isExecute === false) reject(error);
            isExecute = true;
        }, ms);
        Promises.resolve(promise).then((x: any) => {
            if (isExecute === false) resolve(x);
            isExecute = true;

        }, reject);
    });
}

export default timer;

Promises._setOnPrototype('timer', timer);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.resolve<string>('foo').delay(3000);
         *
         *  promises.timer(1500, 'error: timeout').catch((error: string) => {
         *      console.log(error); // error => 'error: timeout'
         *  });
         * ```
         */
        timer(ms?: number, error?: any): Promises<T>;
    }
}
