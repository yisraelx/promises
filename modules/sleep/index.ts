/**
 * @module @promises/sleep
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';

/**
 * @function
 * @param value The value that should resolve after sleep.
 * @param ms The time in milliseconds to sleep
 * @example
 *
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *
 *  sleep(promise, 3000).then((result: string) => {
 *    console.log(result); // result => 'foo'
 *  });
 */
function sleep<T>(value?: IOptionalPromise<T>, ms?: number): Promise<T> {
    return Promise.resolve(value).then(() => new Promise<T>((resolve) => {
        setTimeout(() => resolve(value), ms);
    })) as Promise<T>;
}

export default sleep;
