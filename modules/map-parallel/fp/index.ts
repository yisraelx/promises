/**
 * @module @promises/map-parallel/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseDictionary, IOptionalPromiseArray, IDictionary } from '@promises/interfaces';
import mapParallel from '../';

export interface ICurriedMapParallel {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<T[keyof T & number]>, limit: number, array: IOptionalPromiseArray<T>): Promise<T>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<T[keyof T & number]>, limit: number): (array: IOptionalPromiseArray<T>) => Promise<T>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<T[keyof T & number]>): (limit: number) => (array: IOptionalPromiseArray<T>) => Promise<T>;
    <T extends ArrayLike<any>, R>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<R>, limit: number, array: IOptionalPromiseArray<T>): Promise<R[]>;
    <T extends ArrayLike<any>, R>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<R>, limit: number): (array: IOptionalPromiseArray<T>) => Promise<R[]>;
    <T extends ArrayLike<any>, R>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<R>): (limit: number) => (array: IOptionalPromiseArray<T>) => Promise<R[]>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>, limit: number, object: IOptionalPromiseDictionary<T>): Promise<T>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>, limit: number): (object: IOptionalPromiseDictionary<T>) => Promise<T>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>): (limit: number) => (object: IOptionalPromiseDictionary<T>) => Promise<T>;
    <T extends object, R>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>, limit: number, object: IOptionalPromiseDictionary<T>): Promise<IDictionary<R>>;
    <T extends object, R>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>, limit: number): (object: IOptionalPromiseDictionary<T>) => Promise<IDictionary<R>>;
    <T extends object, R>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>): (limit: number) => (object: IOptionalPromiseDictionary<T>) => Promise<IDictionary<R>>;
}

/**
 * @function
 * @example
 *
 *  let mapper = (time: number) => {
 *      return timeout((resolve) => {
 *          resolve(count++);
 *      }, time);
 *  };
 *
 *  let count: number = 0;
 *  let array: number[] = [7, 1, 6, 9, 3];
 *
 *  mapParallel(mapper)(1)(array).then((result: number[]) => {
 *      console.log(result); // result => [0, 1, 2, 3, 4]
 *  });
 */
let curriedMapParallel: ICurriedMapParallel = _curry(mapParallel);

export { __ } from '@promises/_curry';
export default curriedMapParallel;
