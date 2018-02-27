/**
 * @module @promises/error
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let promises: Promises<string> = Promises.reject<string>('foo');
 *  error(promises, 'bar').catch((error: string) => {
 *    console.log(error); // => 'bar'
 *  });
 * ```
 * @example
 *
 * ```typescript
 *  let promises: Promises<string> = Promises.resolve<string>('foo');
 *  error(promises, 'bar').catch((error: string) => {
 *    console.log(error); // => 'bar'
 *  });
 * ```
 */
function error(promises: IOptionalPromise<any>, value: any): Promises<any> {
    return Promises.resolve(promises).then(() => {
        throw value;
    }) as Promises<any>;
}

export default error;

Promises._setOnPrototype('error', error);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.reject<string>('foo').error('bar');
         *  promises.catch((error: string) => {
         *    console.log(error); // => 'bar'
         *  });
         * ```
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.resolve<string>('foo').error('bar');
         *  promises.catch((error: string) => {
         *    console.log(error); // => 'bar'
         *  });
         * ```
         */
        error(this: Promises<T>, value: any): Promises<any>;
    }
}
