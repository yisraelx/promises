/**
 * @module @promises/filter-series
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
 *  let comparator = Promises.resolve((value) => {
 *      return value % 2 === 0;
 *  });
 *
 *  let array = [0, 1, 2, 3];
 *
 *  filterSeries(array,comparator).then((result)=>{
 *      console.log(result); // [0,2]
 *  });
 * ```
 */
let filterSeries: IFilter = createFilter(forEach, true) as IFilter;

export default filterSeries;

Promises._setOnPrototype('filterSeries', filterSeries);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let comparator = Promises.resolve((value) => {
         *      return value % 2 === 0;
         *  });
         *
         *  let array = [0, 1, 2, 3];
         *  let promises = Promises.resolve(array);
         *
         *  promises.filterSeries(comparator).then((result)=>{
         *      console.log(result); // [0,2]
         *  });
         * ```
         */
        filterSeries: IFilterWrapper<T>;
    }
}