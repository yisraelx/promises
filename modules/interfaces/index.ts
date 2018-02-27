/**
 * @module @promises/interfaces
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';

export type IDictionary<T> = { [key: string]: T };
export type IOptionalPromise<T> = PromiseLike<T> | T;
export type IOptionalPromiseArray<T> = IOptionalPromise<IOptionalPromise<ArrayLike<T[keyof T & number]>>>;
export type IOptionalPromiseDictionary<T> = IOptionalPromise<IOptionalPromise<IDictionary<T[keyof T]>>>;
export type IExecutor<T> = (resolve?: (value?: T) => void, reject?: (reason?: any) => void) => void;

export interface IForEach {
    <T extends ArrayLike<any>>(str: IOptionalPromise<T>, iteratee?: (value: T[keyof T & number], index: number, str: T) => IOptionalPromise<any>): Promises<T>;
    <T>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>): Promises<T>;
}

export interface IForEachWrapper<T> {
    (this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>): Promises<T>;
    (this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>): Promises<T>;
}

export interface IMap {
     <T extends ArrayLike<any>>(array: IOptionalPromiseArray<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<T[keyof T & number]>): Promises<T>;
    <T extends ArrayLike<any>, R>(array: IOptionalPromiseArray<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<R>): Promises<R[]>;
    <T>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>): Promises<T>;
    <T, R>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>): Promises<IDictionary<R>>;
}

export interface IMapWrapper<T> {
    (this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, str: T) => IOptionalPromise<T[keyof T & number]>): Promises<T>;
    <R>(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, str: T) => IOptionalPromise<R>): Promises<R[]>;
    (this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>): Promises<T>;
    <R>(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>): Promises<IDictionary<R>>;
}

export interface IChecksBoolean {
    <T extends ArrayLike<any>>(str: IOptionalPromise<T>, iteratee?: (value: T[keyof T & number], index: number, str: T) => IOptionalPromise<boolean>): Promises<boolean>;
    <T>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promises<boolean>;
}

export interface IChecksBooleanWrapper<T> {
    <T extends ArrayLike<any>>(this: Promises<T & string>, iteratee?: (value: T[keyof T & number], index: number, str: T) => IOptionalPromise<boolean>): Promises<boolean>;
    <T>(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promises<boolean>;
}

export interface IFilter {
    <T extends ArrayLike<any>>(str: IOptionalPromise<T>, iteratee?: (value: T[keyof T & number], index: number, str: T) => IOptionalPromise<boolean>): Promises<T>;
    <T>(object: IOptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promises<T>;
}

export interface IFilterWrapper<T> {
    (this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, str: T) => IOptionalPromise<boolean>): Promises<T>;
    (this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promises<T>;
}

export interface IReduce {
    <T extends ArrayLike<any>>(str: IOptionalPromise<T>, iteratee?: (accumulator: T[keyof T & number], value: T[keyof T & number], index: number, str: T) => IOptionalPromise<T[keyof T & number]>, accumulator?: T[keyof T & number]): Promises<T[keyof T & number]>;
    <T extends ArrayLike<any>, R>(str: IOptionalPromise<T>, iteratee?: (accumulator: R, value: T[keyof T & number], index: number, str: T) => IOptionalPromise<R>, accumulator?: R): Promises<R>;
    <T>(object: IOptionalPromiseDictionary<T>, iteratee?: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>, accumulator?: T[keyof T]): Promises<T[keyof T]>;
    <T, R>(object: IOptionalPromiseDictionary<T>, iteratee?: (accumulator: R, value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>, accumulator?: R): Promises<R>;
}

export interface IReduceWrapper<T> {
    (this: Promises<T & ArrayLike<any>>, iteratee?: (accumulator: T[keyof T & number], value: T[keyof T & number], index: number, str: T) => IOptionalPromise<T[keyof T & number]>, accumulator?: T[keyof T & number]): Promises<T[keyof T & number]>;
    <R>(this: Promises<T & ArrayLike<any>>, iteratee?: (accumulator: R, value: T[keyof T & number], index: number, str: T) => IOptionalPromise<R>, accumulator?: R): Promises<R>;
   (this: Promises<T>, iteratee?: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>, accumulator?: T[keyof T]): Promises<T[keyof T]>;
    <R>(this: Promises<T>, iteratee?: (accumulator: R, value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>, accumulator?: R): Promises<R>;
}
