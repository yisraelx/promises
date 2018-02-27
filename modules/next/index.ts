/**
 * @module @promises/next
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *  next(promise, 'bar').then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 * ```
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.reject<string>('foo');
 *  next(promise, 'bar').then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 * ```
 */
function next<R>(promise: IOptionalPromise<any>, value: IOptionalPromise<R>): Promise<R> {
    return Promise.resolve(promise).then(() => {
        return value;
    }) as Promise<R>;
}

export default next;
