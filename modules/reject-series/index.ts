/**
 * @module @promises/reject-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import forEach from '@promises/for-each-series';
import createFilter from '@promises/_create-filter';
import { IFilter, IFilterWrapper } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let array: any[] = ['yes', null, 0, true];
 *
 *  rejectSeries(array).then((result) => {
 *      console.log(result); // => [null, 0]
 *  });
 * ```
 */
let rejectSeries: IFilter = createFilter(forEach, false) as IFilter;

export default rejectSeries;

Promises._setOnPrototype('rejectSeries', rejectSeries);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let array: any[] = ['yes', null, 0, true];
         *  let promises = Promises.resolve(array);
         *
         *  promises.rejectSeries().then((result) => {
         *      console.log(result); // => [null, 0]
         *  });
         * ```
         */
        rejectSeries: IFilterWrapper<T>;
    }
}
