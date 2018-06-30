import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import whileSeries from './';

Promises._setOnConstructor('whileSeries', whileSeries);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * let index: number = 0;
         * Promises.whileSeries(() => {
         *  console.log(`test ${index}`);
         *  return index++ < 3;
         * }, () => Promises.timeout((resolve) => {
         *  console.log(`iteratee ${index}`);
         *  resolve();
         * }, 4 - index)).then(() => {
         *  console.log('completed');
         * });
         * // => 'test 0'
         * // => 'iteratee 1'
         * // => 'test 1'
         * // => 'iteratee 2'
         * // => 'test 2'
         * // => 'iteratee 3'
         * // => 'test 3'
         * // => 'completed'
         */
        export function whileSeries(test: () => IOptionalPromise<boolean>, iteratee?: () => IOptionalPromise<any>): Promises<void>;
    }
}
