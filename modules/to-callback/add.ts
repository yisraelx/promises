import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import toCallback from './';

Promises._setOnPrototype('toCallback', toCallback);

export default toCallback;

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.resolve<string>('foo');
         *
         *  promises.toCallback((error: any, result: string) => {
         *      console.log(error); // error => null
         *      console.log(result); // result => 'foo'
         *  });
         * ```
         */
        toCallback<R>(this: Promises<T>, callback: (error?: any, value?: T) => IOptionalPromise<R>): Promises<R>;
    }
}
