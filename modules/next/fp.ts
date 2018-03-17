import _curry from '@promises/_curry';
import { IOptionalPromise } from '@promises/interfaces';
import next from './';

export interface INext {
    <R>(newValue: IOptionalPromise<any>, value: IOptionalPromise<R>): Promise<R>;
    <R>(newValue: IOptionalPromise<any>): (value: IOptionalPromise<R>) => Promise<R>;
}

/**
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *  next('bar', promise).then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 * ```
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.reject<string>('foo');
 *  next('bar', promise).then((result: string) => {
 *    console.log(result); // => 'bar'
 *  });
 * ```
 */
export default _curry(next, {length: 2}) as INext;
