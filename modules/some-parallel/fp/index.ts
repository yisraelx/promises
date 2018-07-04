/**
 * @module @promises/some-parallel/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';
import someParallel from '../';

export interface ICurriedSomeParallel {
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit: number, array: IOptionalPromiseArray<T>): Promise<boolean>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit: number): (array: IOptionalPromiseArray<T>) => Promise<boolean>;
    <T extends ArrayLike<any>>(iteratee: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): (limit: number) => (array: IOptionalPromiseArray<T>) => Promise<boolean>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit: number, object: IOptionalPromiseDictionary<T>): Promise<boolean>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit: number): (object: IOptionalPromiseDictionary<T>) => Promise<boolean>;
    <T extends object>(iteratee: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): (limit: number) => (object: IOptionalPromiseDictionary<T>) => Promise<boolean>;
}

/**
 * @function
 * @example
 *
 *  let array: any[] = [0, null, true, false];
 *
 *  someParallel(void 0, 3, array).then((result: boolean) => {
 *      console.log(result); // result => true
 *  });
 */
let curriedSomeParallel: ICurriedSomeParallel = _curry(someParallel);

export { __ } from '@promises/_curry';
export default curriedSomeParallel;
