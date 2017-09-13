/**
 * @module @promises/sleep
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import { OptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let promises: Promises<string> = Promises.resolve<string>('foo');
 *  sleep(promises, 3000).then((result: string) => {
 *    console.log(result); // result => 'foo'
 *  });
 * ```
 */
function sleep<T>(value?: OptionalPromise<T>, ms?: number): Promises<T> {
    return Promises.resolve(value).then(() => new Promises<T>((resolve) => {
        setTimeout(() => resolve(value), ms);
    })) as Promises<T>;
}

export default sleep;

Promises._setOnPrototype('sleep', sleep);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.resolve<string>('foo');
         *  promises.sleep(3000).then((result: string) => {
         *    console.log(result); // result => 'foo'
         *  });
         * ```
         */
        sleep(ms?: number): Promises<T>;
    }
}