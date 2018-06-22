import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import compose from './';

Promises._setOnConstructor('compose', compose, false);

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
        export function compose<T, P1, R>(fn1: (value?: IOptionalPromise<T>) => IOptionalPromise<P1>, fn2: (value: IOptionalPromise<P1>) => IOptionalPromise<R>): (value?: T) => Promises<R>;
        export function compose<T, P1, P2, R>(fn1: (value?: IOptionalPromise<T>) => IOptionalPromise<P1>, fn2: (value: IOptionalPromise<P1>) => IOptionalPromise<P2>, fn3: (value: IOptionalPromise<P2>) => IOptionalPromise<R>): (value?: T) => Promises<R>;
        export function compose<T, P1, P2, P3, R>(fn1: (value?: IOptionalPromise<T>) => IOptionalPromise<P1>, fn2: (value: IOptionalPromise<P1>) => IOptionalPromise<P2>, fn3: (value: IOptionalPromise<P2>) => IOptionalPromise<P3>, fn4: (value: IOptionalPromise<P3>) => IOptionalPromise<R>): (value?: T) => Promises<R>;
        export function compose<T, P1, P2, P3, P4, R>(fn1: (value?: IOptionalPromise<T>) => IOptionalPromise<P1>, fn2: (value: IOptionalPromise<P1>) => IOptionalPromise<P2>, fn3: (value: IOptionalPromise<P2>) => IOptionalPromise<P3>, fn4: (value: IOptionalPromise<P3>) => IOptionalPromise<P4>, fn5: (value: IOptionalPromise<P4>) => IOptionalPromise<R>): (value?: T) => Promises<R>;
        export function compose<T, P1, P2, P3, P4, P5, R>(fn1: (value?: IOptionalPromise<T>) => IOptionalPromise<P1>, fn2: (value: IOptionalPromise<P1>) => IOptionalPromise<P2>, fn3: (value: IOptionalPromise<P2>) => IOptionalPromise<P3>, fn4: (value: IOptionalPromise<P3>) => IOptionalPromise<P4>, fn5: (value: IOptionalPromise<P4>) => IOptionalPromise<P5>, fn6: (value: IOptionalPromise<P5>) => IOptionalPromise<R>): (value?: T) => Promises<R>;
        export function compose<T, P1, P2, P3, P4, P5, P6, R>(fn1: (value?: IOptionalPromise<T>) => IOptionalPromise<P1>, fn2: (value: IOptionalPromise<P1>) => IOptionalPromise<P2>, fn3: (value: IOptionalPromise<P2>) => IOptionalPromise<P3>, fn4: (value: IOptionalPromise<P3>) => IOptionalPromise<P4>, fn5: (value: IOptionalPromise<P4>) => IOptionalPromise<P5>, fn6: (value: IOptionalPromise<P5>) => IOptionalPromise<P6>, fn7: (value: IOptionalPromise<P6>) => IOptionalPromise<R>): (value?: T) => Promises<R>;
        export function compose<T, P1, P2, P3, P4, P5, P6, P7, R>(fn1: (value?: IOptionalPromise<T>) => IOptionalPromise<P1>, fn2: (value: IOptionalPromise<P1>) => IOptionalPromise<P2>, fn3: (value: IOptionalPromise<P2>) => IOptionalPromise<P3>, fn4: (value: IOptionalPromise<P3>) => IOptionalPromise<P4>, fn5: (value: IOptionalPromise<P4>) => IOptionalPromise<P5>, fn6: (value: IOptionalPromise<P5>) => IOptionalPromise<P6>, fn7: (value: IOptionalPromise<P6>) => IOptionalPromise<P7>, fn8: (value: IOptionalPromise<P7>) => IOptionalPromise<R>): (value?: T) => Promises<R>;
        export function compose<T, P1, P2, P3, P4, P5, P6, P7, P8, R>(fn1: (value?: IOptionalPromise<T>) => IOptionalPromise<P1>, fn2: (value: IOptionalPromise<P1>) => IOptionalPromise<P2>, fn3: (value: IOptionalPromise<P2>) => IOptionalPromise<P3>, fn4: (value: IOptionalPromise<P3>) => IOptionalPromise<P4>, fn5: (value: IOptionalPromise<P4>) => IOptionalPromise<P5>, fn6: (value: IOptionalPromise<P5>) => IOptionalPromise<P6>, fn7: (value: IOptionalPromise<P6>) => IOptionalPromise<P7>, fn8: (value: IOptionalPromise<P7>) => IOptionalPromise<P8>, fn9: (value: IOptionalPromise<P8>) => IOptionalPromise<R>): (value?: T) => Promises<R>;
        export function compose<T, P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn1: (value?: IOptionalPromise<T>) => IOptionalPromise<P1>, fn2: (value: IOptionalPromise<P1>) => IOptionalPromise<P2>, fn3: (value: IOptionalPromise<P2>) => IOptionalPromise<P3>, fn4: (value: IOptionalPromise<P3>) => IOptionalPromise<P4>, fn5: (value: IOptionalPromise<P4>) => IOptionalPromise<P5>, fn6: (value: IOptionalPromise<P5>) => IOptionalPromise<P6>, fn7: (value: IOptionalPromise<P6>) => IOptionalPromise<P7>, fn8: (value: IOptionalPromise<P7>) => IOptionalPromise<P8>, fn9: (value: IOptionalPromise<P8>) => IOptionalPromise<P9>, fn10: (value: IOptionalPromise<P9>) => IOptionalPromise<R>): (value?: T) => Promises<R>;
    }
}
