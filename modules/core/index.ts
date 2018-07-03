/**
 * @module @promises/core
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

declare let ES6Promise: typeof Promise;
let basePromise: typeof Promise = typeof Promise !== 'undefined' ? Promise : ES6Promise;

if (typeof basePromise === 'undefined') {
    throw new Error(`Missing Promise support, the requirements are a global "Promise" (native or polyfill).`);
}

export class Promises<T> extends basePromise<T> {
}

try {
    exports.Promises = ((Promises as any) = Function(`return function(basePromise){return class Promises extends basePromise{} }`)()(basePromise));
} catch (e) {

}

export namespace Promises {
    export function _setOnConstructor(key: string, fn: Function, wrap: boolean = true): void {
        this[key] = this[key] || wrap ? function () {
            let result = fn.apply(this, arguments);
            return this.resolve(result);
        } : fn;
    }

    export function _setOnPrototype(key: string, fn: Function, wrap: boolean = true): void {
        this.prototype[key] = this.prototype[key] || wrap ? function () {
            let {length} = arguments;
            let args = Array(length + 1);
            args[0] = this;
            for (let i = 1; i <= length; i++) {
                args[i] = arguments[i - 1];
            }
            let result = fn.apply(this, args);
            return this.constructor.resolve(result);
        } : fn;
    }
}

/**
 * @source typescript/lib/lib.es6.d.ts
 * @override Promise methods return type (from Promise to Promises)
 */
export interface Promises<T> {
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promises<TResult1 | TResult2>;

    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promises<T | TResult>;
}

/**
 * @source typescript/lib/lib.es6.d.ts
 * @override Promise static methods return type (from Promise to Promises)
 */
export declare namespace Promises {
    export function all<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promises<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;
    export function all<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promises<[T1, T2, T3, T4, T5, T6, T7, T8, T9]>;
    export function all<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promises<[T1, T2, T3, T4, T5, T6, T7, T8]>;
    export function all<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promises<[T1, T2, T3, T4, T5, T6, T7]>;
    export function all<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promises<[T1, T2, T3, T4, T5, T6]>;
    export function all<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promises<[T1, T2, T3, T4, T5]>;
    export function all<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promises<[T1, T2, T3, T4]>;
    export function all<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promises<[T1, T2, T3]>;
    export function all<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promises<[T1, T2]>;
    export function all<T>(values: (T | PromiseLike<T>)[]): Promises<T[]>;

    export function race<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>, T10 | PromiseLike<T10>]): Promises<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>;
    export function race<T1, T2, T3, T4, T5, T6, T7, T8, T9>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>, T9 | PromiseLike<T9>]): Promises<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>;
    export function race<T1, T2, T3, T4, T5, T6, T7, T8>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>, T8 | PromiseLike<T8>]): Promises<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>;
    export function race<T1, T2, T3, T4, T5, T6, T7>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>, T7 | PromiseLike<T7>]): Promises<T1 | T2 | T3 | T4 | T5 | T6 | T7>;
    export function race<T1, T2, T3, T4, T5, T6>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>, T6 | PromiseLike<T6>]): Promises<T1 | T2 | T3 | T4 | T5 | T6>;
    export function race<T1, T2, T3, T4, T5>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>, T5 | PromiseLike<T5>]): Promises<T1 | T2 | T3 | T4 | T5>;
    export function race<T1, T2, T3, T4>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>, T4 | PromiseLike<T4>]): Promises<T1 | T2 | T3 | T4>;
    export function race<T1, T2, T3>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>, T3 | PromiseLike<T3>]): Promises<T1 | T2 | T3>;
    export function race<T1, T2>(values: [T1 | PromiseLike<T1>, T2 | PromiseLike<T2>]): Promises<T1 | T2>;
    export function race<T>(values: (T | PromiseLike<T>)[]): Promises<T>;

    export function reject(reason: any): Promises<never>;
    export function reject<T>(reason: any): Promises<T>;

    export function resolve<T>(value: T | PromiseLike<T>): Promises<T>;
    export function resolve(): Promises<void>;
}

export default Promises;
