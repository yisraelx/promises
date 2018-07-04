/**
 * @module @promises/next/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import next from '../';

export interface ICurriedNext {
    <R>(newValue: IOptionalPromise<any>, value: IOptionalPromise<R>): Promise<R>;
    <R>(newValue: IOptionalPromise<any>): (value: IOptionalPromise<R>) => Promise<R>;
}

/**
 * @function
 * @example
 *
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *
 *  next('bar', promise).then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 *
 * @example
 *
 *  let promise: Promise<string> = Promise.reject<string>('foo');
 *
 *  next('bar', promise).then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 */
let curriedNext: ICurriedNext = _curry(next);

export { __ } from '@promises/_curry';
export default curriedNext;
