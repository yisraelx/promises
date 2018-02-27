import Promises from '@promises/core';
import { IDictionary, IOptionalPromise } from '@promises/interfaces';
import series from './';

Promises._setOnConstructor('series', series);

export default series;

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  let fn = (id: string, ms: number) => () => timeout((resolve) => {
         *      console.log(id);
         *      resolve(id);
         *  }, ms);
         *  let functions = {
         *      zero: fn(0, 7),
         *      one: fn(1, 3),
         *      two: fn(2, 5),
         *  };
         *
         *  Promises.series(functions).then((result: {[key: string]: number}) => {
         *      console.log(result);
         *  });
         *
         *  // => 0
         *  // => 1
         *  // => 2
         *  // => { zero: 0, one: 1, two: 2}
         * ```
         */
        export function series<R>(array: (() => IOptionalPromise<R>)[]): Promises<R[]>;
        export function series<R extends ArrayLike<any>>(array: (() => IOptionalPromise<R[keyof R & number]>)[]): Promises<R>;
        export function series<R>(object: IDictionary<(() => IOptionalPromise<R>)>): Promises<IDictionary<R>>;
        export function series<R extends IDictionary<any>>(object: IDictionary<(() => IOptionalPromise<R[keyof R]>)>): Promises<R>;
    }
}
