/**
 * @module @promises/every-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import forEach from '@promises/for-each-series';
import createChecksBoolean from '@promises/_create-checks-boolean';
import { IChecksBoolean, IChecksBooleanWrapper } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let comparator = (value) => {
 *      return Promises.resolve(Boolean(value));
 *  };
 *
 *  let array = ['foo', true, Promises.resolve(-1)];
 *
 *  everySeries(array, comparator).then((result)=>{
 *      console.log(result); // result => true
 *  });
 * ```
 */
let everySeries: IChecksBoolean = createChecksBoolean(forEach, (truthy) => {
    return truthy ? true : Promises.reject(false);
}, false) as IChecksBoolean;

export default everySeries;

Promises._setOnPrototype('everySeries', everySeries);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let comparator = (value) => {
         *      return Promises.resolve(Boolean(value));
         *  };
         *
         *  let array = ['foo', true, Promises.resolve(-1)];
         *  let promises = Promises.resolve(array);
         *
         *  promises.everySeries(comparator).then((result)=>{
         *      console.log(result); // result => true
         *  });
         * ```
         */
        everySeries: IChecksBooleanWrapper<T>;
    }
}
