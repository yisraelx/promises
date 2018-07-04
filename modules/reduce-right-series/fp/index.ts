/**
 * @module @promises/reduce-right-series/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';
import reduceRightSeries from '../';

export interface ICurriedReduceRightSeries {
    <T extends ArrayLike<any>>(iteratee: (accumulator: T[keyof T & number], value: T[keyof T & number], index: number, array: T) => IOptionalPromise<T[keyof T & number]>, accumulator: T[keyof T & number], array: IOptionalPromiseArray<T>): Promise<T[keyof T & number]>;
    <T extends ArrayLike<any>>(iteratee: (accumulator: T[keyof T & number], value: T[keyof T & number], index: number, array: T) => IOptionalPromise<T[keyof T & number]>, accumulator: T[keyof T & number]): (array: IOptionalPromiseArray<T>) => Promise<T[keyof T & number]>;
    <T extends ArrayLike<any>>(iteratee: (accumulator: T[keyof T & number], value: T[keyof T & number], index: number, array: T) => IOptionalPromise<T[keyof T & number]>): (accumulator: T[keyof T & number]) => (array: IOptionalPromiseArray<T>) => Promise<T[keyof T & number]>;
    <T extends ArrayLike<any>, R>(iteratee: (accumulator: R, value: T[keyof T & number], index: number, array: T) => IOptionalPromise<R>, accumulator: R, array: IOptionalPromiseArray<T>): Promise<R>;
    <T extends ArrayLike<any>, R>(iteratee: (accumulator: R, value: T[keyof T & number], index: number, array: T) => IOptionalPromise<R>, accumulator: R): (array: IOptionalPromiseArray<T>) => Promise<R>;
    <T extends ArrayLike<any>, R>(iteratee: (accumulator: R, value: T[keyof T & number], index: number, array: T) => IOptionalPromise<R>): (accumulator: R) => (array: IOptionalPromiseArray<T>) => Promise<R>;
    <T extends object>(iteratee: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>, accumulator: T[keyof T], object: IOptionalPromiseDictionary<T>): Promise<T[keyof T]>;
    <T extends object>(iteratee: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>, accumulator: T[keyof T]): (object: IOptionalPromiseDictionary<T>) => Promise<T[keyof T]>;
    <T extends object>(iteratee: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>): (accumulator: T[keyof T]) => (object: IOptionalPromiseDictionary<T>) => Promise<T[keyof T]>;
    <T extends object, R>(iteratee: (accumulator: R, value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>, accumulator: R, object: IOptionalPromiseDictionary<T>): Promise<R>;
    <T extends object, R>(iteratee: (accumulator: R, value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>, accumulator: R): (object: IOptionalPromiseDictionary<T>) => Promise<R>;
    <T extends object, R>(iteratee: (accumulator: R, value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>): (accumulator: R) => (object: IOptionalPromiseDictionary<T>) => Promise<R>;
}

/**
 * @function
 * @example
 *
 *  let array: number[] = [0, 1, 2, 3];
 *
 *  reduceRightSeries((sum: number, num: number) => Promise.resolve(sum + num), 0)(array).then((result: number) => {
 *      console.log(result); // => 6
 *  });
 */
let curriedReduceRightSeries: ICurriedReduceRightSeries = _curry(reduceRightSeries);

export { __ } from '@promises/_curry';
export default curriedReduceRightSeries;
