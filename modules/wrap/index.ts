/**
 * @module @promises/wrap
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 *  function multiply(a: number, b: number){
 *      return a * b;
 *  }
 *
 *  let multiplyWrap: (a: number, b: number) => Promise<number> = wrap(multiply);
 *  let promise: Promise<number> = multiplyWrap(2, 3);
 *
 *  promise.then((result: number) => {
 *      console.log(result); // result => 6
 *  });
 */
function wrap<R>(fn: () => R, context?: any): () => Promise<R>;
function wrap<P1, R>(fn: (p1: P1) => R, context?: any): (p1: IOptionalPromise<P1>) => Promise<R>;
function wrap<P1, P2, R>(fn: (p1: P1, p2: P2) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>) => Promise<R>;
function wrap<P1, P2, P3, R>(fn: (p1: P1, p2: P2, p3: P3) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>) => Promise<R>;
function wrap<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>) => Promise<R>;
function wrap<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>) => Promise<R>;
function wrap<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>) => Promise<R>;
function wrap<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>) => Promise<R>;
function wrap<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>, p8: IOptionalPromise<P8>) => Promise<R>;
function wrap<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>, p8: IOptionalPromise<P8>, p9: IOptionalPromise<P9>) => Promise<R>;
function wrap<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9, p10: P10) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>, p8: IOptionalPromise<P8>, p9: IOptionalPromise<P9>, p10: IOptionalPromise<P10>) => Promise<R>;
function wrap(fn, context?) {
    return function (...args) {
        return Promise.all(args).then((args) => {
            return fn.apply(context || this, args);
        });
    };
}

export default wrap;
