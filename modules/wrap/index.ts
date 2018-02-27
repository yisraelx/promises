/**
 * @module @promises/wrap
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import { OptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  function multiply(a: number, b: number){
 *      return a * b;
 *  }
 *
 *  let multiplyWrap: (a: number, b: number) => Promises<number> = wrap(multiply);
 *  let promises: Promises<number> = multiplyWrap(2, 3);
 *
 *  promises.then((result: number) => {
 *      console.log(result); // result => 6
 *  });
 * ```
 */
function wrapStatic<R>(fn: () => R, context?: any): () => Promises<R>;
function wrapStatic<P1, R>(fn: (p1: P1) => R, context?: any): (p1: OptionalPromise<P1>) => Promises<R>;
function wrapStatic<P1, P2, R>(fn: (p1: P1, p2: P2) => R, context?: any): (p1: OptionalPromise<P1>, p2: OptionalPromise<P2>) => Promises<R>;
function wrapStatic<P1, P2, P3, R>(fn: (p1: P1, p2: P2, p3: P3) => R, context?: any): (p1: OptionalPromise<P1>, p2: OptionalPromise<P2>, p3: OptionalPromise<P3>) => Promises<R>;
function wrapStatic<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => R, context?: any): (p1: OptionalPromise<P1>, p2: OptionalPromise<P2>, p3: OptionalPromise<P3>, p4: OptionalPromise<P4>) => Promises<R>;
function wrapStatic<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, context?: any): (p1: OptionalPromise<P1>, p2: OptionalPromise<P2>, p3: OptionalPromise<P3>, p4: OptionalPromise<P4>, p5: OptionalPromise<P5>) => Promises<R>;
function wrapStatic<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, context?: any): (p1: OptionalPromise<P1>, p2: OptionalPromise<P2>, p3: OptionalPromise<P3>, p4: OptionalPromise<P4>, p5: OptionalPromise<P5>, p6: OptionalPromise<P6>) => Promises<R>;
function wrapStatic<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, context?: any): (p1: OptionalPromise<P1>, p2: OptionalPromise<P2>, p3: OptionalPromise<P3>, p4: OptionalPromise<P4>, p5: OptionalPromise<P5>, p6: OptionalPromise<P6>, p7: OptionalPromise<P7>) => Promises<R>;
function wrapStatic<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, context?: any): (p1: OptionalPromise<P1>, p2: OptionalPromise<P2>, p3: OptionalPromise<P3>, p4: OptionalPromise<P4>, p5: OptionalPromise<P5>, p6: OptionalPromise<P6>, p7: OptionalPromise<P7>, p8: OptionalPromise<P8>) => Promises<R>;
function wrapStatic<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, context?: any): (p1: OptionalPromise<P1>, p2: OptionalPromise<P2>, p3: OptionalPromise<P3>, p4: OptionalPromise<P4>, p5: OptionalPromise<P5>, p6: OptionalPromise<P6>, p7: OptionalPromise<P7>, p8: OptionalPromise<P8>, p9: OptionalPromise<P9>) => Promises<R>;
function wrapStatic<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9, p10: P10) => R, context?: any): (p1: OptionalPromise<P1>, p2: OptionalPromise<P2>, p3: OptionalPromise<P3>, p4: OptionalPromise<P4>, p5: OptionalPromise<P5>, p6: OptionalPromise<P6>, p7: OptionalPromise<P7>, p8: OptionalPromise<P8>, p9: OptionalPromise<P9>, p10: OptionalPromise<P10>) => Promises<R>;
function wrapStatic(fn, context?) {
    return function (...args) {
        return Promises.all(args).then((args) => {
            return fn.apply(context || this, args);
        });
    };
}

export default wrapStatic;

Promises._setOnConstructor('wrap', wrapStatic, false);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  function multiply(a: number, b: number){
         *      return a * b;
         *  }
         *
         *  let multipalWrap: (a: number, b: number) => Promises<number> = Promises.wrap(multiply);
         *  let promises: Promises<number> = multipalWrap(2, 3);
         *
         *  promises.then((result: number) => {
         *      console.log(result); // result => 6
         *  });
         * ```
         */
        export let wrap: typeof wrapStatic;
    }
}
