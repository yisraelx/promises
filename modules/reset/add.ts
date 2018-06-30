import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import reset from './';

Promises._setOnPrototype('reset', reset);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         *  let promises: Promises<string> = Promises.resolve<string>('foo').reset('bar');
         *  promises.then((result: string) => {
         *    console.log(result); // => 'bar'
         *  });
         * @example
         *
         *  let promises: Promises<string> = Promises.reject<string>('foo').reset('bar');
         *  promises.then((result: string) => {
         *    console.log(result); // => 'bar'
         *  });
         */
        reset<R>(this: Promises<T>, newValue: IOptionalPromise<R>): Promises<R>;
    }
}
