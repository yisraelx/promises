import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import wrap from './';

Promises._setOnConstructor('wrap', wrap, false);

export default wrap;

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
         *  let multiplyWrap: (a: number, b: number) => Promises<number> = Promises.wrap(multiply);
         *  let promises: Promises<number> = multiplyWrap(2, 3);
         *
         *  promises.then((result: number) => {
         *      console.log(result); // result => 6
         *  });
         * ```
         */
        export function wrap<R>(fn: () => R, context?: any): () => Promises<R>;
        export function wrap<P1, R>(fn: (p1: P1) => R, context?: any): (p1: IOptionalPromise<P1>) => Promises<R>;
        export function wrap<P1, P2, R>(fn: (p1: P1, p2: P2) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>) => Promises<R>;
        export function wrap<P1, P2, P3, R>(fn: (p1: P1, p2: P2, p3: P3) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>) => Promises<R>;
        export function wrap<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>) => Promises<R>;
        export function wrap<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>) => Promises<R>;
        export function wrap<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>) => Promises<R>;
        export function wrap<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>) => Promises<R>;
        export function wrap<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>, p8: IOptionalPromise<P8>) => Promises<R>;
        export function wrap<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>, p8: IOptionalPromise<P8>, p9: IOptionalPromise<P9>) => Promises<R>;
        export function wrap<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9, p10: P10) => R, context?: any): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>, p8: IOptionalPromise<P8>, p9: IOptionalPromise<P9>, p10: IOptionalPromise<P10>) => Promises<R>;
    }
}
