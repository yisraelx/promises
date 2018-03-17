import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseDictionary } from '@promises/interfaces';
import someParallel from './';

export interface ISomeParallel {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit: number, array: IOptionalPromise<T>): Promise<boolean>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit: number): (array: IOptionalPromise<T>) => Promise<boolean>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): (limit: number) => (array: IOptionalPromise<T>) => Promise<boolean>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit: number, object: IOptionalPromiseDictionary<T>): Promise<boolean>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit: number): (object: IOptionalPromiseDictionary<T>) => Promise<boolean>;
    <T>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): (limit: number) => (object: IOptionalPromiseDictionary<T>) => Promise<boolean>;
}

/**
 * @example
 *
 * ```typescript
 *  let array: any[] = [0, null, true, false];
 *
 *  someParallel(void 0, 3, array).then((result: boolean) => {
 *      console.log(result); // result => true
 *  });
 * ```
 */
export default _curry(someParallel, {length: 3}) as ISomeParallel;