/**
 * @module @promises/sleep/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import sleep from '../';

export interface ISleep {
    <T>(ms: number, value: IOptionalPromise<T>): Promise<T>;
    <T>(ms: number): (value: IOptionalPromise<T>) => Promise<T>;
}

/**
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *  sleep(3000, promise).then((result: string) => {
 *    console.log(result); // result => 'foo'
 *  });
 * ```
 */
export default _curry(sleep, {length: 2}) as ISleep;
