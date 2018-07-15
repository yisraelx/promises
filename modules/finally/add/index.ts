import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import _finally from '../';

Promises._setOnPrototype('finally', _finally);

export default Promises;

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         *  let promises = Promises.resolve('foo');
         *
         *  promises.finally(() => {
         *      console.log('done'); // => 'done'
         *  });
         * @example
         *
         *  let promises = Promises.reject('foo');
         *
         *  promises.finally(() => {
         *      console.log('done'); // => 'done'
         *  });
         */
        finally(this: Promises<T>, fn: () => IOptionalPromise<any>): Promises<T>;
    }
}
