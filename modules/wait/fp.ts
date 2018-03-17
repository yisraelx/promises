import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import wait from './';

export interface IWait {
    <T>(test: (value: T) => IOptionalPromise<boolean>, ms: number, value: IOptionalPromise<T>): Promise<T>;
    <T>(test: (value: T) => IOptionalPromise<boolean>, ms: number): (value: IOptionalPromise<T>) => Promise<T>;
    <T>(test: (value: T) => IOptionalPromise<boolean>): (ms: number) => (value: IOptionalPromise<T>) => Promise<T>;
}

/**
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *  let count: number = 0;
 *  wait(() => count++ === 3, 1000).then((result: string) => {
 *    console.log(result); // result => 'foo'
 *  })(100)(promise);
 * ```
 */
export default _curry(wait, {length: 3}) as IWait;
