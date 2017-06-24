/**
 * @module @promises/reject-parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import forEach from '@promises/for-each-parallel';
import createFilter from '@promises/_create-filter';
import { IFilter, IFilterWrapper } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let array: any[] = ['yes', null, 0, true];
 *
 *  rejectParallel(array).then((result) => {
 *      console.log(result); // => [null, 0]
 *  });
 * ```
 */
let rejectParallel: IFilter = createFilter(forEach, false) as IFilter;

export default rejectParallel;

Promises._setOnPrototype('rejectParallel', rejectParallel);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let array: any[] = ['yes', null, 0, true];
         *  let promises = Promises.resolve(array);
         *
         *  promises.rejectParallel().then((result) => {
         *      console.log(result); // => [null, 0]
         *  });
         * ```
         */
        rejectParallel: IFilterWrapper<T>;
    }
}