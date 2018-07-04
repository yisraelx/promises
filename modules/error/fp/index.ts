/**
 * @module @promises/error/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import error from '../';

export interface ICurriedError {
    (newValue: any, value: IOptionalPromise<any>): Promise<never>;
    (newValue: any): (value: IOptionalPromise<any>) => Promise<never>;
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
let curriedError: ICurriedError = _curry(error);

export { __ } from '@promises/_curry';
export default curriedError;
