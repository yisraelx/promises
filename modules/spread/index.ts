/**
 * @module @promises/spread
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import { OptionalPromise, OptionalPromiseArray } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let promises = Promises.resolve([Promises.resolve('foo'), Promises.resolve('bar')]);
 *
 *  spread(promises, (a: string, b: string) => {
 *      console.log(a); // a => 'foo'
 *      console.log(b); // b => 'bar'
 *  });
 * ```
 */
function spread<T extends ArrayLike<any>>(array: OptionalPromiseArray<T>, fn: (...args: (T[keyof T & number])[]) => OptionalPromise<T>): Promises<T>;
function spread<T extends ArrayLike<any>, R>(array: OptionalPromiseArray<T>, fn: (...args: (T[keyof T & number])[]) => OptionalPromise<R>): Promises<R>;
function spread(array, fn) {
    return (Promises as any).resolve(array).then((array) => {
        return Array.isArray(array) ? Promises.all(array) : Object(array);
    }).then((args) => {
        return fn(...args);
    });
}

export default spread;

Promises._setOnPrototype('spread', spread);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises = Promises.resolve([Promises.resolve('foo'), Promises.resolve('bar')]);
         *
         *  promises.spread((a: string, b: string) => {
         *      console.log(a); // a => 'foo'
         *      console.log(b); // b => 'bar'
         *  })
         * ```
         */
        spread(this: Promises<T & ArrayLike<any>>, fn: (...args: (T[keyof T & number])[]) => OptionalPromise<T>): Promises<T>;
        spread<R>(this: Promises<T & ArrayLike<any>>, fn: (...args: (T[keyof T & number])[]) => OptionalPromise<R>): Promises<R>;
    }
}