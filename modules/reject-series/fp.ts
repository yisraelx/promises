import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';
import rejectSeries from './';

export interface IRejectSeries {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, array: IOptionalPromise<T>): Promise<T>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): (array: IOptionalPromise<T>) => Promise<T>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, object: IOptionalPromiseDictionary<T>): Promise<T>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): (object: IOptionalPromiseDictionary<T>) => Promise<T>;
}

/**
 * @example
 *
 * ```typescript
 *  let array: any[] = ['yes', null, 0, true];
 *  let promise: Promise<any[]> = Promise.resolve(array);
 *
 *  rejectSeries(void 0, promise).then((result: any[]) => {
 *      console.log(result); // => [null, 0]
 *  });
 * ```
 */
export default _curry(rejectSeries, {length: 2}) as IRejectSeries;