import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import reset from './';

Promises._setOnPrototype('reset', reset);

export default reset;

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.resolve<string>('foo').reset('bar');
         *  promises.then((result: string) => {
         *    console.log(result); // => 'bar'
         *  });
         * ```
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.reject<string>('foo').reset('bar');
         *  promises.then((result: string) => {
         *    console.log(result); // => 'bar'
         *  });
         * ```
         */
        reset<R>(this: Promises<T>, value: IOptionalPromise<R>): Promises<R>;
    }
}
