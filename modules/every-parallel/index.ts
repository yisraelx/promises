/**
 * @module @promises/every-parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import forEach from '@promises/for-each-parallel';
import createChecksBoolean from '@promises/_create-checks-boolean';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';

export interface IEveryParallel {
    <T extends ArrayLike<any>>(array: IOptionalPromise<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit?: number): Promise<boolean>;
    <T>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit?: number): Promise<boolean>;
}

/**
 * @function
 * @example
 *
 *  let comparator = (value: any) => {
 *      return Promise.resolve(Boolean(value))
 *  };
 *
 *  let array: any[] = [true, 1, Promise.resolve(null), 'yes'];
 *
 *  everyParallel(array, comparator).then((result: boolean)=>{
 *      console.log(result) // result => false
 *  });
 */
let everyParallel: IEveryParallel = createChecksBoolean(forEach, (truthy) => {
    return truthy ? true : Promise.reject(false);
}, false) as IEveryParallel;

export default everyParallel;
