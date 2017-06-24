/**
 * @module @promises/compose
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import reduce from '@promises/reduce-series';
import { OptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let prefix = (str: string) => Promises.resolve(`_${str}`);
 *  let toUpperCase = (str: string) => String.prototype.toUpperCase.call(str);
 *  let method = compose(prefix, toUpperCase);
 *
 *  method('some').then((result: string) => {
 *      console.log(result); // => '_SOME'
 *  });
 * ```
 */
function composeStatic<T, P1, R>(fn1: (value?: OptionalPromise<T>) => OptionalPromise<P1>, fn2: (value: OptionalPromise<P1>) => OptionalPromise<R>): (value?: T) => Promises<R>;
function composeStatic<T, P1, P2, R>(fn1: (value?: OptionalPromise<T>) => OptionalPromise<P1>, fn2: (value: OptionalPromise<P1>) => OptionalPromise<P2>, fn3: (value: OptionalPromise<P2>) => OptionalPromise<R>): (value?: T) => Promises<R>;
function composeStatic<T, P1, P2, P3, R>(fn1: (value?: OptionalPromise<T>) => OptionalPromise<P1>, fn2: (value: OptionalPromise<P1>) => OptionalPromise<P2>, fn3: (value: OptionalPromise<P2>) => OptionalPromise<P3>, fn4: (value: OptionalPromise<P3>) => OptionalPromise<R>): (value?: T) => Promises<R>;
function composeStatic<T, P1, P2, P3, P4, R>(fn1: (value?: OptionalPromise<T>) => OptionalPromise<P1>, fn2: (value: OptionalPromise<P1>) => OptionalPromise<P2>, fn3: (value: OptionalPromise<P2>) => OptionalPromise<P3>, fn4: (value: OptionalPromise<P3>) => OptionalPromise<P4>, fn5: (value: OptionalPromise<P4>) => OptionalPromise<R>): (value?: T) => Promises<R>;
function composeStatic<T, P1, P2, P3, P4, P5, R>(fn1: (value?: OptionalPromise<T>) => OptionalPromise<P1>, fn2: (value: OptionalPromise<P1>) => OptionalPromise<P2>, fn3: (value: OptionalPromise<P2>) => OptionalPromise<P3>, fn4: (value: OptionalPromise<P3>) => OptionalPromise<P4>, fn5: (value: OptionalPromise<P4>) => OptionalPromise<P5>, fn6: (value: OptionalPromise<P5>) => OptionalPromise<R>): (value?: T) => Promises<R>;
function composeStatic<T, P1, P2, P3, P4, P5, P6, R>(fn1: (value?: OptionalPromise<T>) => OptionalPromise<P1>, fn2: (value: OptionalPromise<P1>) => OptionalPromise<P2>, fn3: (value: OptionalPromise<P2>) => OptionalPromise<P3>, fn4: (value: OptionalPromise<P3>) => OptionalPromise<P4>, fn5: (value: OptionalPromise<P4>) => OptionalPromise<P5>, fn6: (value: OptionalPromise<P5>) => OptionalPromise<P6>, fn7: (value: OptionalPromise<P6>) => OptionalPromise<R>): (value?: T) => Promises<R>;
function composeStatic<T, P1, P2, P3, P4, P5, P6, P7, R>(fn1: (value?: OptionalPromise<T>) => OptionalPromise<P1>, fn2: (value: OptionalPromise<P1>) => OptionalPromise<P2>, fn3: (value: OptionalPromise<P2>) => OptionalPromise<P3>, fn4: (value: OptionalPromise<P3>) => OptionalPromise<P4>, fn5: (value: OptionalPromise<P4>) => OptionalPromise<P5>, fn6: (value: OptionalPromise<P5>) => OptionalPromise<P6>, fn7: (value: OptionalPromise<P6>) => OptionalPromise<P7>, fn8: (value: OptionalPromise<P7>) => OptionalPromise<R>): (value?: T) => Promises<R>;
function composeStatic<T, P1, P2, P3, P4, P5, P6, P7, P8, R>(fn1: (value?: OptionalPromise<T>) => OptionalPromise<P1>, fn2: (value: OptionalPromise<P1>) => OptionalPromise<P2>, fn3: (value: OptionalPromise<P2>) => OptionalPromise<P3>, fn4: (value: OptionalPromise<P3>) => OptionalPromise<P4>, fn5: (value: OptionalPromise<P4>) => OptionalPromise<P5>, fn6: (value: OptionalPromise<P5>) => OptionalPromise<P6>, fn7: (value: OptionalPromise<P6>) => OptionalPromise<P7>, fn8: (value: OptionalPromise<P7>) => OptionalPromise<P8>, fn9: (value: OptionalPromise<P8>) => OptionalPromise<R>): (value?: T) => Promises<R>;
function composeStatic<T, P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn1: (value?: OptionalPromise<T>) => OptionalPromise<P1>, fn2: (value: OptionalPromise<P1>) => OptionalPromise<P2>, fn3: (value: OptionalPromise<P2>) => OptionalPromise<P3>, fn4: (value: OptionalPromise<P3>) => OptionalPromise<P4>, fn5: (value: OptionalPromise<P4>) => OptionalPromise<P5>, fn6: (value: OptionalPromise<P5>) => OptionalPromise<P6>, fn7: (value: OptionalPromise<P6>) => OptionalPromise<P7>, fn8: (value: OptionalPromise<P7>) => OptionalPromise<P8>, fn9: (value: OptionalPromise<P8>) => OptionalPromise<P9>, fn10: (value: OptionalPromise<P9>) => OptionalPromise<R>): (value?: T) => Promises<R>;
function composeStatic(...functions) {
    return (value) => {
        return reduce(functions, (value, fn) => {
            return fn(value);
        }, value);
    };
}

export default composeStatic;

Promises._setOnConstructor('compose', composeStatic, false);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  let prefix = (str: string) => `_${str}`;
         *  let toUpperCase = (str: string) => String.prototype.toUpperCase.call(str);
         *  let method = Promises.compose(prefix, toUpperCase);
         *
         *  method('some').then((result: string) => {
         *      console.log(result); // => '_SOME'
         *  });
         * ```
         */
        export let compose: typeof composeStatic;
    }
}
