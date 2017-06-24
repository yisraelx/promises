/**
 * @module @promises/every-parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import forEach from '@promises/for-each-parallel';
import createChecksBoolean from '@promises/_create-checks-boolean';
import { IChecksBoolean, IChecksBooleanWrapper } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let comparator = (value) => {
 *      return Promises.resolve(Boolean(value))
 *  };
 *
 *  let array = [true, 1, Promises.resolve(null), 'yes'];
 *
 *  everyParallel(array, comparator).then((result)=>{
 *      console.log(result) // result => false
 *  });
 * ```
 */
let everyParallel: IChecksBoolean = createChecksBoolean(forEach, (truthy) => {
    return truthy ? true : Promises.reject(false);
}, false) as IChecksBoolean;

export default everyParallel;

Promises._setOnPrototype('everyParallel', everyParallel);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let comparator = (value) => {
         *      return Promises.resolve(Boolean(value))
         *  };
         *
         *  let array = [true, 1, Promises.resolve(null), 'yes'];
         *  let promises = Promises.resolve(array);
         *
         *  promises.everyParallel(comparator).then((result)=>{
         *      console.log(result) // result => false
         *  });
         * ```
         */
        everyParallel: IChecksBooleanWrapper<T>;
    }
}
