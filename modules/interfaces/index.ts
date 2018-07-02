/**
 * @module @promises/interfaces
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

export type IDictionary<T> = { [key: string]: T };
export type IOptionalPromise<T> = T | PromiseLike<T>;
export type IOptionalPromiseArray<T extends ArrayLike<any>> = IOptionalPromise<ArrayLike<IOptionalPromise<T[keyof T & number]>>>;
export type IOptionalPromiseDictionary<T extends object> = IOptionalPromise<IDictionary<IOptionalPromise<T[keyof T]>>>;
export type IExecutor<T> = (resolve?: (value?: T) => void, reject?: (reason?: any) => void) => void;
