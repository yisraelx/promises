import Promises from '@promises/core';
import error from './';

Promises._setOnPrototype('error', error);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         *  let promises: Promises<string> = Promises.reject<string>('foo').error('bar');
         *  promises.catch((error: string) => {
         *    console.log(error); // => 'bar'
         *  });
         * @example
         *
         *  let promises: Promises<string> = Promises.resolve<string>('foo').error('bar');
         *  promises.catch((error: string) => {
         *    console.log(error); // => 'bar'
         *  });
         */
        error(this: Promises<T>, newValue: any): Promises<never>;
    }
}
