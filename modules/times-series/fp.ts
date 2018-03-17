import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';
import timesSeries from './';

export interface ITimesSeries {
    <T extends any[]>(fn: (time: number) => IOptionalPromise<T[keyof T & number]>, times: IOptionalPromise<number>): Promise<T>;
    <T extends any[]>(fn: (time: number) => IOptionalPromise<T[keyof T & number]>): (times: IOptionalPromise<number>) => Promise<T>;
}

/**
 * @example
 *
 * ```typescript
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
 * ```
 */
export default _curry(timesSeries, {length: 2}) as ITimesSeries;
