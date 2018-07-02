/**
 * @module @promises/times-series/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import timesSeries from '../';

export interface ICurriedTimesSeries {
    <T extends any[]>(fn: (time: number) => IOptionalPromise<T[keyof T & number]>, times: IOptionalPromise<number>): Promise<T>;
    <T extends any[]>(fn: (time: number) => IOptionalPromise<T[keyof T & number]>): (times: IOptionalPromise<number>) => Promise<T>;
}

/**
 * @function
 * @example
 *
 *  let times: number = 3;
 *
 *  timesSeries((time: number) => {
 *      let ms = (times-time) * 3;
 *      return timeout((resolve) => {
 *          console.log(time);
 *          resolve(ms);
 *      }, ms);
 *  }, times).then((result: number[]) => {
 *      console.log(result);
 *  });
 *
 *  // => 0
 *  // => 1
 *  // => 2
 *  // => [9, 6, 3]
 */
let curriedTimesSeries: ICurriedTimesSeries = _curry(timesSeries);

export default curriedTimesSeries;
