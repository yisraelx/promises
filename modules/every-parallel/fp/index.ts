/**
 * @module @promises/every-parallel/fp
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */
import _curry from '@promises/_curry';
import { IOptionalPromise, IOptionalPromiseArray, IOptionalPromiseDictionary } from '@promises/interfaces';
import everyParallel from '../';

export interface ICurriedEveryParallel {
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
 *  let comparator = (value: any) => {
 *      return Promise.resolve(Boolean(value))
 *  };
 *
 *  let array: any[] = [true, 1, Promise.resolve(null), 'yes'];
 *
 *  everyParallel(comparator)(Infinity)(array).then((result: boolean)=>{
 *      console.log(result) // result => false
 *  });
 */
let curriedEveryParallel: ICurriedEveryParallel = _curry(everyParallel);

export { __ } from '@promises/_curry';
export default curriedEveryParallel;
