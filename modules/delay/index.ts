/**
 * @module @promises/delay
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';

/**
 * @example
 *
 * ```typescript
 *  let promises: Promises<string> = Promises.resolve<string>('foo');
 *  delay(promises, 3000).then((result: string) => {
 *    console.log(result); // result => 'foo'
 *  });
 * ```
 */
function delay<T>(value?: Promises<T> | T, ms?: number): Promises<T> {
    return new Promises<T>((resolve) => {
        setTimeout(() => resolve(value), ms);
    });
}

export default delay;

Promises._setOnPrototype('delay', delay);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.resolve<string>('foo');
         *  promises.delay(3000).then((result: string) => {
         *    console.log(result); // result => 'foo'
         *  });
         * ```
         */
        delay(ms?: number): Promises<T>;
    }
}