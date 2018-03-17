import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';
import forEachRightSeries from './';

export interface IForEachRightSeries {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>, array: IOptionalPromise<T>): Promise<T>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>): (array: IOptionalPromise<T>) => Promise<T>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>, object: IOptionalPromiseDictionary<T>): Promise<T>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>): (object: IOptionalPromiseDictionary<T>) => Promise<T>;
}

/**
 * @example
 *
 * ```typescript
 *  let array: number[] = [3, 7, 1, 5];
 *
 *  console.log('before');
 *  forEachRightSeries((value: number) => {
 *      console.log(`start: ${ value }`);
 *      return timeout((resolve) => {
 *          console.log(`end: ${ value }`);
 *          resolve();
 *      }, value);
 *  }, array).then(() => {
 *      console.log('complete');
 *  });
 *  console.log('after');
 *
 *  // => before
 *  // => after
 *  // => start 5
 *  // => end 5
 *  // => start 1
 *  // => end 1
 *  // => start 7
 *  // => end 7
 *  // => start 3
 *  // => end 3
 *  // => complete
 * ```
 */
export default _curry(forEachRightSeries, {length: 2}) as IForEachRightSeries;
