/**
 * @module @promises/some-parallel
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
 *  let array: any[] = [0, null, true, false];
 *
 *  someParallel(array).then((result: boolean) => {
 *      console.log(result); // result => true
 *  });
 * ```
 */
let someParallel: IChecksBoolean = createChecksBoolean(forEach, (truthy) => {
    return truthy ? Promises.reject(true) : false;
}, true) as IChecksBoolean;

export default someParallel;

Promises._setOnPrototype('someParallel', someParallel);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let array: any[] = [0, null, true, false];
         *  let promises = Promises.resolve(array);
         *
         *  promises.someParallel().then((result: boolean) => {
         *    console.log(result); // result => true
         *  });
         * ```
         */
        someParallel: IChecksBooleanWrapper<T>;
    }
}
