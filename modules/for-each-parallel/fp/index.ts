/**
 * @module @promises/for-each-parallel/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';
import forEachParallel from '../';

export interface IForEachParallel {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>, limit: number, array: IOptionalPromise<T>): Promise<T>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>, limit: number): (array: IOptionalPromise<T>) => Promise<T>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>): (limit: number) => (array: IOptionalPromise<T>) => Promise<T>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>, limit: number, object: IOptionalPromiseDictionary<T>): Promise<T>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>, limit: number): (object: IOptionalPromiseDictionary<T>) => Promise<T>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>): (limit: number) => (object: IOptionalPromiseDictionary<T>) => Promise<T>;
}

/**
 * @function
 * @example
 *
 *  let array: number[] = [3, 7, 1, 5];
 *
 *  console.log('before');
 *
 *  forEachParallel((value: number) => {
 *      console.log(`start: ${ value }`);
 *
 *      return timeout((resolve) => {
 *          console.log(`end: ${ value }`);
 *          resolve();
 *      }, value);
 *
 *  })(Infinity, array).then(() => {
 *      console.log('complete');
 *  });
 *
 *  console.log('after');
 *
 *  // => before
 *  // => after
 *  // => start 3
 *  // => start 7
 *  // => start 1
 *  // => start 5
 *  // => end 1
 *  // => end 3
 *  // => end 5
 *  // => end 7
 *  // => complete
 */
let curriedForEachParallel: IForEachParallel = _curry(forEachParallel);

export default curriedForEachParallel;
