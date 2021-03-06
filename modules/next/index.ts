/**
 * @module @promises/next
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';

/**
 * @function
 * @example
 *
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *
 *  next(promise, 'bar').then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 *
 * @example
 *
 *  let promise: Promise<string> = Promise.reject<string>('foo');
 *
 *  next(promise, 'bar').then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 */
function next<R>(value: IOptionalPromise<any>, newValue: IOptionalPromise<R>): Promise<R> {
    return Promise.resolve(value).then(() => newValue);
}

export default next;
