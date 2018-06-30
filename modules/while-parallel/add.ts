import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import whileParallel from './';

Promises._setOnConstructor('whileParallel', whileParallel);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
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
         * // => 'completed'
         */
        export function whileParallel(test: () => IOptionalPromise<boolean>, iteratee?: () => IOptionalPromise<any>, limit?: number): Promises<void>;
    }
}
