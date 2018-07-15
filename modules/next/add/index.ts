import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import next from '../';

Promises._setOnPrototype('next', next);

export default Promises;

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         *  let promises: Promises<string> = Promises.resolve<string>('foo').next('bar');
         *  promises.then((result: string) => {
         *    console.log(result); // => 'bar'
         *  });
         * @example
         *
         *  let promises: Promises<string> = Promises.reject<string>('foo').next('bar');
         *  promises.then((result: string) => {
         *    console.log(result); // => 'bar'
         *  });
         */
        next<R>(this: Promises<T>, newValue: IOptionalPromise<R>): Promises<R>;
    }
}
