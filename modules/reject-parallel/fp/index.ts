/**
 * @module @promises/reject-parallel/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';
import rejectParallel from '../';

export interface ICurriedRejectParallel {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit: number, array: IOptionalPromiseArray<T>): Promise<T>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit: number): (array: IOptionalPromiseArray<T>) => Promise<T>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): (limit: number) => (array: IOptionalPromiseArray<T>) => Promise<T>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit: number, object: IOptionalPromiseDictionary<T>): Promise<T>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit: number): (object: IOptionalPromiseDictionary<T>) => Promise<T>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): (limit: number) => (object: IOptionalPromiseDictionary<T>) => Promise<T>;
}

/**
 * @function
 * @example
 *
 *  let array: any[] = ['yes', null, 0, true];
 *
 *  rejectParallel(Boolean)(1)(array).then((result: any[]) => {
 *      console.log(result); // => [null, 0]
 *  });
 */
let curriedRejectParallel: ICurriedRejectParallel = _curry(rejectParallel);

export default curriedRejectParallel;
