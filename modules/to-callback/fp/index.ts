/**
 * @module @promises/to-callback/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import toCallback from '../';

export interface ICurriedToCallback {
    <T, R>(callback: (error?: any, value?: T) => IOptionalPromise<R>, value: IOptionalPromise<T>): Promise<R>;
    <T, R>(callback: (error?: any, value?: T) => IOptionalPromise<R>): (value: IOptionalPromise<T>) => Promise<R>;
}

/**
 * @function
 * @example
 *
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *
 *  toCallback((error: any, result: string) => {
 *      console.log(error); // error => null
 *      console.log(result); // result => 'foo'
 *  })(promise);
 */
let curriedToCallback: ICurriedToCallback = _curry(toCallback);

export default curriedToCallback;
