/**
 * @module @promises/some-series
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
 *  let array: any[] = [0, null, true, false];
 *
 *  someSeries(array).then((result: boolean) => {
 *      console.log(result); // result => true
 *  });
 * ```
 */
let someSeries: IChecksBoolean = createChecksBoolean(forEach, (truthy) => {
    return truthy ? Promises.reject(true) : false;
}, true) as IChecksBoolean;

export default someSeries;

Promises._setOnPrototype('someSeries', someSeries);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let array: any[] = [0, null, true, false];
         *  let promises = Promises.resolve(array);
         *
         *  promises.someSeries().then((result: boolean) => {
         *    console.log(result); // result => true
         *  });
         * ```
         */
        someSeries: IChecksBooleanWrapper<T>;
    }
}