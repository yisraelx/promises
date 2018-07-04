/**
 * @module @promises/times-parallel/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import timesParallel from '../';

export interface ICurriedTimesParallel {
    <T extends any[]>(fn: (time: number) => IOptionalPromise<T[keyof T & number]>, limit: number, times: IOptionalPromise<number>): Promise<T>;
    <T extends any[]>(fn: (time: number) => IOptionalPromise<T[keyof T & number]>, limit: number): (times: IOptionalPromise<number>) => Promise<T>;
    <T extends any[]>(fn: (time: number) => IOptionalPromise<T[keyof T & number]>): (limit: number) => (times: IOptionalPromise<number>) => Promise<T>;
}

/**
 * @function
 * @example
 *
 *  let times: number = 3;
 *
 *  timesParallel((time: number) => {
 *      let ms = (times-time) * 3;
 *      return timeout((resolve) => {
 *          console.log(time);
 *          resolve(ms);
 *      }, ms);
 *  })(1)(times).then((result: number[]) => {
 *      console.log(result);
 *  });
 *
 *  // => 0
 *  // => 1
 *  // => 2
 *  // => [9, 6, 3]
 */
let curriedTimesParallel: ICurriedTimesParallel = _curry(timesParallel);

export { __ } from '@promises/_curry';
export default curriedTimesParallel;
