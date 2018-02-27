/**
 * @module @promises/parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import map from '@promises/map-parallel';
import { IOptionalPromise, IDictionary } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let fn = (id: string, ms: number) => () => timeout((resolve) => {
 *      console.log(id);
 *      resolve(id);
 *  }, ms);
 *  let functions = {
 *      zero: fn(0, 7),
 *      one: fn(1, 3),
 *      two: fn(2, 5),
 *  };
 *
 *  parallel(functions).then((result: {[key: string]: number}) => {
 *      console.log(result);
 *  });
 *
 *  // => 1
 *  // => 2
 *  // => 0
 *  // => { zero: 0, one: 1, two: 2}
 * ```
 */
function parallel<R>(array: (() => IOptionalPromise<R>)[]): Promise<R[]>;
function parallel<R extends ArrayLike<any>>(array: (() => IOptionalPromise<R[keyof R & number]>)[]): Promise<R>;
function parallel<R>(object: IDictionary<(() => IOptionalPromise<R>)>): Promise<IDictionary<R>>;
function parallel<R extends IDictionary<any>>(object: IDictionary<(() => IOptionalPromise<R[keyof R]>)>): Promise<R>;
function parallel(functions) {
    return map(functions, (fn) => fn()) as any;
}

export default parallel;
