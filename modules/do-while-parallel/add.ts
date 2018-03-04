import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import doWhileParallel from './';

Promises._setOnConstructor('doWhileParallel', doWhileParallel);

export default doWhileParallel;

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         * let index: number = 0;
         * Promises.whileParallel(() => {
         *  console.log(`test ${index}`);
         *  return index++ < 3;
         * }, () => {
         *  let thisIndex = index;
         *  return Promises.timeout((resolve) => {
         *   console.log(`iteratee ${thisIndex}`);
         *   resolve();
         *  }, 4 - index);
         * }).then(() => {
         *  console.log('completed');
         * });
         * // => 'test 0'
         * // => 'test 1'
         * // => 'test 2'
         * // => 'test 3'
         * // => 'iteratee 3'
         * // => 'iteratee 2'
         * // => 'iteratee 1'
         * // => 'iteratee 0'
         * // => 'completed'
         * ```
         */
        export function doWhileParallel(test: () => IOptionalPromise<boolean>, iteratee?: () => IOptionalPromise<any>, limit?: number): Promises<void>;
    }
}
