/**
 * @module @promises/series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import map from '@promises/map-series';
import { IOptionalPromise, IDictionary } from '@promises/interfaces';

/**
 * @function
 * @example
 *
 *  let fn = (id: string, ms: number) => () => timeout((resolve) => {
 *      console.log(id);
 *      resolve(id);
 *  }, ms);
 *  let functions = [
 *      fn('zero', 7),
 *      fn('one', 3),
 *      fn('two', 5)
 *  ];
 *
 *  series(functions).then((result: string[]) => {
 *      console.log(result);
 *  });
 *
 *  // => 'zero'
 *  // => 'one'
 *  // => 'two'
 *  // => ['zero', 'one', 'two']
 */
function series<R>(array: (() => IOptionalPromise<R>)[]): Promise<R[]>;
function series<R extends ArrayLike<any>>(array: (() => IOptionalPromise<R[keyof R & number]>)[]): Promise<R>;
function series<R>(object: IDictionary<(() => IOptionalPromise<R>)>): Promise<IDictionary<R>>;
function series<R extends IDictionary<any>>(object: IDictionary<(() => IOptionalPromise<R[keyof R]>)>): Promise<R>;
function series(functions) {
    return map(functions, (fn) => fn()) as any;
}

export default series;
