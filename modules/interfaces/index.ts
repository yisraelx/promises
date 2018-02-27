/**
 * @module @promises/interfaces
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

export type IDictionary<T> = { [key: string]: T };
export type IOptionalPromise<T> = PromiseLike<T> | T;
export type IOptionalPromiseArray<T> = IOptionalPromise<IOptionalPromise<ArrayLike<T[keyof T & number]>>>;
export type IOptionalPromiseDictionary<T> = IOptionalPromise<IOptionalPromise<IDictionary<T[keyof T]>>>;
export type IExecutor<T> = (resolve?: (value?: T) => void, reject?: (reason?: any) => void) => void;
