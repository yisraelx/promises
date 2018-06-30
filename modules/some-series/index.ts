/**
 * @module @promises/some-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import forEach from '@promises/for-each-series';
import createChecksBoolean from '@promises/_create-checks-boolean';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';

export interface ISomeSeries {
    <T extends ArrayLike<any>>(array: IOptionalPromise<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): Promise<boolean>;
    <T>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promise<boolean>;
}

/**
 * @function
 * @example
 *
 *  let array: any[] = [0, null, true, false];
 *
 *  someSeries(array).then((result: boolean) => {
 *      console.log(result); // result => true
 *  });
 */
let someSeries: ISomeSeries = createChecksBoolean(forEach, (truthy) => {
    return truthy ? Promise.reject(true) : false;
}, true) as ISomeSeries;

export default someSeries;
