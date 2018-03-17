import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import next from './';

Promises._setOnPrototype('next', next);

export default next;

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.resolve<string>('foo').next('bar');
         *  promises.then((result: string) => {
         *    console.log(result); // => 'bar'
         *  });
         * ```
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.reject<string>('foo').next('bar');
         *  promises.then((result: string) => {
         *    console.log(result); // => 'bar'
         *  });
         * ```
         */
        next<R>(this: Promises<T>, newValue: IOptionalPromise<R>): Promises<R>;
    }
}
