import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import wait from './';

Promises._setOnPrototype('wait', wait);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.resolve<string>('foo');
         *  let count: number = 0;
         *  promises.wait(() => count++ === 3, 1000).then((result: string) => {
         *    console.log(result); // result => 'foo'
         *  });
         * ```
         */
        wait(this: Promises<T>, test?: (value: T) => IOptionalPromise<boolean>, ms?: number): Promises<T>;
    }
}
