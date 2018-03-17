import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import toCallback from './';

export interface IToCallback {
    <T, R>(callback: (error?: any, value?: T) => IOptionalPromise<R>, value: IOptionalPromise<T>): Promise<R>;
    <T, R>(callback: (error?: any, value?: T) => IOptionalPromise<R>): (value: IOptionalPromise<T>) => Promise<R>;
}

/**
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *
 *  toCallback((error: any, result: string) => {
 *      console.log(error); // error => null
 *      console.log(result); // result => 'foo'
 *  })(promise);
 * ```
 */
export default _curry(toCallback, {length: 2}) as IToCallback;
