import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import forever from '../';

Promises._setOnConstructor('forever', forever);

export default Promises;

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * Promises.forever((count: number) => new Promise((resolve, reject) => {
         *  setImmediate(() => {
         *   count >= 5 ? reject('foo') : resolve(++count);
         *  });
         * }), 0).catch((error: string) => {
         *  console.log(error) // error => 'reject'
         * });
         */
        export function forever<T>(iteratee: (previous?: T) => IOptionalPromise<any>, factor?: T): Promises<never>;
    }
}
