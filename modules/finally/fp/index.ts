/**
 * @module @promises/finally/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import _finally from '../';

export interface IFinally {
    <R>(fn: () => IOptionalPromise<any>, promise: IOptionalPromise<R>): Promise<R>;
    <R>(fn: () => IOptionalPromise<any>): (promise: IOptionalPromise<R>) => Promise<R>;
}

/**
 * @example
 *
 * ```typescript
 *  let promise = Promise.resolve('foo');
 *  finally(() => {
 *      console.log('done'); // => 'done'
 *  }, promise);
 * ```
 * @example
 *
 * ```typescript
 *  let promise = Promise.reject('foo');
 *  finally(() => {
 *      console.log('done'); // => 'done'
 *  })(promise);
 * ```
 */
export default _curry(_finally, {length: 2}) as IFinally;
