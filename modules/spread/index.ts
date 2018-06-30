/**
 * @module @promises/spread
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise, IOptionalPromiseArray } from '@promises/interfaces';

/**
 * @example
 *
 *  let promise = Promise.resolve([Promise.resolve('foo'), 'bar']);
 *
 *  spread(promise, (a: string, b: string) => {
 *      console.log(a); // a => 'foo'
 *      console.log(b); // b => 'bar'
 *  });
 */
function spread<T extends ArrayLike<any>>(array: IOptionalPromiseArray<T>, fn: (...args: (T[keyof T & number])[]) => IOptionalPromise<T>): Promise<T>;
function spread<T extends ArrayLike<any>, R>(array: IOptionalPromiseArray<T>, fn: (...args: (T[keyof T & number])[]) => IOptionalPromise<R>): Promise<R>;
function spread(array, fn) {
    return (Promise as any).resolve(array).then((array) => {
        return Array.isArray(array) ? Promise.all(array) : Object(array);
    }).then((args) => {
        return fn(...args);
    });
}

export default spread;
