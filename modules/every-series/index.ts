/**
 * @module @promises/every-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import forEach from '@promises/for-each-series';
import createChecksBoolean from '@promises/_create-checks-boolean';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';

export interface IEverySeries {
    <T extends ArrayLike<any>>(array: IOptionalPromise<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): Promise<boolean>;
    <T>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promise<boolean>;
}

/**
 * @function
 * @example
 *
 *  let comparator = (value: any) => {
 *      return Promise.resolve(Boolean(value));
 *  };
 *
 *  let array: any[] = ['foo', true, Promise.resolve(-1)];
 *
 *  everySeries(array, comparator).then((result: boolean)=>{
 *      console.log(result); // result => true
 *  });
 */
let everySeries: IEverySeries = createChecksBoolean(forEach, (truthy) => {
    return truthy ? true : Promise.reject(false);
}, false) as IEverySeries;

export default everySeries;
