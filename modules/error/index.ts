/**
 * @module @promises/error
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.reject<string>('foo');
 *  error(promise, 'bar').catch((error: string) => {
 *    console.log(error); // => 'bar'
 *  });
 * ```
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *  error(promise, 'bar').catch((error: string) => {
 *    console.log(error); // => 'bar'
 *  });
 * ```
 */
function error(value: IOptionalPromise<any>, newValue: any): Promise<never> {
    return Promise.resolve(value).then(() => {
        throw newValue;
    });
}

export default error;
