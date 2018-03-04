import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import spread from './';

Promises._setOnPrototype('spread', spread);

export default spread;

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises = Promises.all(['foo', Promises.resolve('bar')]);
         *
         *  promises.spread((a: string, b: string) => {
         *      console.log(a); // a => 'foo'
         *      console.log(b); // b => 'bar'
         *  });
         * ```
         */
        spread(this: Promises<T & ArrayLike<any>>, fn: (...args: (T[keyof T & number])[]) => IOptionalPromise<T>): Promises<T>;
        spread<R>(this: Promises<T & ArrayLike<any>>, fn: (...args: (T[keyof T & number])[]) => IOptionalPromise<R>): Promises<R>;
    }
}
