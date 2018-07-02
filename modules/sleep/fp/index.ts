/**
 * @module @promises/sleep/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import sleep from '../';

export interface ICurriedSleep {
    <T>(ms: number, value: IOptionalPromise<T>): Promise<T>;
    <T>(ms: number): (value: IOptionalPromise<T>) => Promise<T>;
}

/**
 * @function
 * @example
 *
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *
 *  sleep(3000, promise).then((result: string) => {
 *    console.log(result); // result => 'foo'
 *  });
 */
let curriedSleep: ICurriedSleep = _curry(sleep);

export default curriedSleep;
