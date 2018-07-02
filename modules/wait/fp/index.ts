/**
 * @module @promises/wait/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import wait from '../';

export interface ICurriedWait {
    <T>(test: (value: T) => IOptionalPromise<boolean>, ms: number, value: IOptionalPromise<T>): Promise<T>;
    <T>(test: (value: T) => IOptionalPromise<boolean>, ms: number): (value: IOptionalPromise<T>) => Promise<T>;
    <T>(test: (value: T) => IOptionalPromise<boolean>): (ms: number) => (value: IOptionalPromise<T>) => Promise<T>;
}

/**
 * @function
 * @example
 *
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *  let count: number = 0;
 *
 *  wait(() => count++ === 3, 1000).then((result: string) => {
 *    console.log(result); // result => 'foo'
 *  })(100)(promise);
 */
let curriedWait: ICurriedWait = _curry(wait);

export default  curriedWait;
