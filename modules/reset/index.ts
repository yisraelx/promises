/**
 * @module @promises/reset
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *  reset(promise, 'bar').then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 * ```
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.reject<string>('foo');
 *  reset(promise, 'bar').then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 * ```
 */
function reset<R>(promise: IOptionalPromise<any>, value: IOptionalPromise<R>): Promise<R> {
    return Promise.resolve(promise).then(() => value, () => value) as Promise<R>;
}

export default reset;
