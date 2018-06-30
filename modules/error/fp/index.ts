/**
 * @module @promises/error/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import error from '../';

export interface IError {
    <R>(newValue: IOptionalPromise<any>, value: IOptionalPromise<R>): Promise<R>;
    <R>(newValue: IOptionalPromise<any>): (value: IOptionalPromise<R>) => Promise<R>;
}

/**
 * @function
 * @example
 *
 *  let promise: Promise<string> = Promise.reject<string>('foo');
 *
 *  error('bar')()(promise).catch((error: string) => {
 *    console.log(error); // => 'bar'
 *  });
 *
 * @example
 *
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *
 *  error('bar', promise).catch((error: string) => {
 *    console.log(error); // => 'bar'
 *  });
 */
let curriedError: IError = _curry(error);

export default curriedError;
