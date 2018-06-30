/**
 * @module @promises/map-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import forEach from '@promises/for-each-series';
import createMap from '@promises/_create-map';
import { IDictionary, IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';

export interface IMapSeries {
    <T extends ArrayLike<any>>(array: IOptionalPromiseArray<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<T[keyof T & number]>): Promise<T>;
    <T extends ArrayLike<any>, R>(array: IOptionalPromiseArray<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<R>): Promise<R[]>;
    <T>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>): Promise<T>;
    <T, R>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>): Promise<IDictionary<R>>;
}

/**
 * @function
 * @example
 *
 *  let mapper = (time: number) => {
 *      return timeout((resolve) => {
 *          resolve(index);
 *      }, time);
 *  };
 *
 *  let count: number = 0;
 *  let array: number[] = [7, 1, 6, 9, 3];
 *
 *  mapSeries(array, mapper).then((result: number[]) => {
 *      console.log(result); // result => [0, 1, 2, 3, 4]
 *  });
 */
let mapSeries: IMapSeries = createMap(forEach) as IMapSeries;

export default mapSeries;
