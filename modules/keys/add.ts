import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import keys from './';

Promises._setOnPrototype('keys', keys);

export default keys;

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let object = { foo: 'bar'};
         *  let promises: Promises<{[key: string]: string}> = Promises.resolve(object);
         *
         *  promises.keys((keys: string[]) => {
         *      console.log(keys); // => ['foo']
         *  });
         * ```
         */
        keys(this: Promises<T>): Promises<string[]>;
        keys<R>(this: Promises<T>, fn: (keys: string[]) => IOptionalPromise<R>): Promises<R>;
    }
}
