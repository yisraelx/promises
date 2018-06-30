/**
 * @module @promises/reset/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import reset from '../';

export interface IReset {
    <R>(newValue: IOptionalPromise<any>, value: IOptionalPromise<R>): Promise<R>;
    <R>(newValue: IOptionalPromise<any>): (value: IOptionalPromise<R>) => Promise<R>;
}

/**
 * @function
 * @example
 *
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *
 *  reset('bar')(promise).then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 *
 * @example
 *
 *  let promise: Promise<string> = Promise.reject<string>('foo');
 *
 *  reset('bar', promise).then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 */
let curriedReset: IReset = _curry(reset);

export default curriedReset;
