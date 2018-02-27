/**
 * @module @promises/filter-parallel
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
 *  let comparator = (value: number) => {
 *      return value % 2 === 0;
 *  };
 *
 *  let array = Array.from({length:5}, (value, index) => i++);
 *
 *  filterParallel(array, comparator).then((result: number[])=>{
 *      console.log(result); // result => [0, 2, 4]
 *  });
 * ```
 */
let filterParallel: IFilter = createFilter(forEach, true) as IFilter;

export default filterParallel;

Promises._setOnPrototype('filterParallel', filterParallel);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let comparator = (value: number) => {
         *      return value % 2 === 0;
         *  };
         *
         *  let array = Array.from({length:5}, (value, index) => i++);
         *  let promises = Promises.resolve(array);
         *
         *  promises.filterParallel(comparator).then((result: number[])=>{
         *      console.log(result); // result => [0, 2, 4]
         *  });
         * ```
         */
        filterParallel: IFilterWrapper<T>;
    }
}
