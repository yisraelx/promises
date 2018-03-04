import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import doWhileSeries from './';

Promises._setOnConstructor('doWhileSeries', doWhileSeries);

export default doWhileSeries;

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         * let index: number = 0;
         * Promises.doWhileSeries(() => {
         *  console.log(`test ${index}`);
         *  return index++ < 3;
         * }, () => Promises.timeout((resolve) => {
         *  console.log(`iteratee ${index}`);
         *  resolve();
         * }, 4 - index)).then(() => {
         *  console.log('completed');
         * });
         * // => 'iteratee 0'
         * // => 'test 0'
         * // => 'iteratee 1'
         * // => 'test 1'
         * // => 'iteratee 2'
         * // => 'test 2'
         * // => 'iteratee 3'
         * // => 'test 3'
         * // => 'completed'
         * ```
         */
        export function doWhileSeries(test: () => IOptionalPromise<boolean>, iteratee?: () => IOptionalPromise<any>): Promises<void>;
    }
}
