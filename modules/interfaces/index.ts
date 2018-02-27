/**
 * @module @promises/interfaces
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';

export type Dictionary<T> = { [key: string]: T };
export type OptionalPromise<T> = PromiseLike<T> | T;
export type OptionalPromiseArray<T> = OptionalPromise<OptionalPromise<ArrayLike<T[keyof T & number]>>>;
export type OptionalPromiseDictionary<T> = OptionalPromise<OptionalPromise<Dictionary<T[keyof T]>>>;
export type IExecute<T> = (resolve?: (value?: T) => void, reject?: (reason?: any) => void) => void;

export interface IForEach {
    <T extends ArrayLike<any>>(str: OptionalPromise<T>, iteratee?: (value: T[keyof T & number], index: number, str: T) => OptionalPromise<any>): Promises<T>;
    <T>(object: OptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => OptionalPromise<any>): Promises<T>;
}

export interface IForEachWrapper<T> {
    (this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => OptionalPromise<any>): Promises<T>;
    (this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => OptionalPromise<any>): Promises<T>;
}

export interface IMap {
     <T extends ArrayLike<any>>(array: OptionalPromiseArray<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => OptionalPromise<T[keyof T & number]>): Promises<T>;
    <T extends ArrayLike<any>, R>(array: OptionalPromiseArray<T>, iteratee?: (value: T[keyof T & number], index: number, array: T) => OptionalPromise<R>): Promises<R[]>;
    <T>(object: OptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => OptionalPromise<T[keyof T]>): Promises<T>;
    <T, R>(object: OptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => OptionalPromise<R>): Promises<Dictionary<R>>;
}

export interface IMapWrapper<T> {
    (this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, str: T) => OptionalPromise<T[keyof T & number]>): Promises<T>;
    <R>(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, str: T) => OptionalPromise<R>): Promises<R[]>;
    (this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => OptionalPromise<T[keyof T]>): Promises<T>;
    <R>(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => OptionalPromise<R>): Promises<Dictionary<R>>;
}

export interface IChecksBoolean {
    <T extends ArrayLike<any>>(str: OptionalPromise<T>, iteratee?: (value: T[keyof T & number], index: number, str: T) => OptionalPromise<boolean>): Promises<boolean>;
    <T>(object: OptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => OptionalPromise<boolean>): Promises<boolean>;
}

export interface IChecksBooleanWrapper<T> {
    <T extends ArrayLike<any>>(this: Promises<T & string>, iteratee?: (value: T[keyof T & number], index: number, str: T) => OptionalPromise<boolean>): Promises<boolean>;
    <T>(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => OptionalPromise<boolean>): Promises<boolean>;
}

export interface IFilter {
    <T extends ArrayLike<any>>(str: OptionalPromise<T>, iteratee?: (value: T[keyof T & number], index: number, str: T) => OptionalPromise<boolean>): Promises<T>;
    <T>(object: OptionalPromiseDictionary<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => OptionalPromise<boolean>): Promises<T>;
}

export interface IFilterWrapper<T> {
    (this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, str: T) => OptionalPromise<boolean>): Promises<T>;
    (this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => OptionalPromise<boolean>): Promises<T>;
}

export interface IReduce {
    <T extends ArrayLike<any>>(str: OptionalPromise<T>, iteratee?: (accumulator: T[keyof T & number], value: T[keyof T & number], index: number, str: T) => OptionalPromise<T[keyof T & number]>, accumulator?: T[keyof T & number]): Promises<T[keyof T & number]>;
    <T extends ArrayLike<any>, R>(str: OptionalPromise<T>, iteratee?: (accumulator: R, value: T[keyof T & number], index: number, str: T) => OptionalPromise<R>, accumulator?: R): Promises<R>;
    <T>(object: OptionalPromiseDictionary<T>, iteratee?: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, object: T) => OptionalPromise<T[keyof T]>, accumulator?: T[keyof T]): Promises<T[keyof T]>;
    <T, R>(object: OptionalPromiseDictionary<T>, iteratee?: (accumulator: R, value: T[keyof T], key: keyof T, object: T) => OptionalPromise<R>, accumulator?: R): Promises<R>;
}

export interface IReduceWrapper<T> {
    (this: Promises<T & ArrayLike<any>>, iteratee?: (accumulator: T[keyof T & number], value: T[keyof T & number], index: number, str: T) => OptionalPromise<T[keyof T & number]>, accumulator?: T[keyof T & number]): Promises<T[keyof T & number]>;
    <R>(this: Promises<T & ArrayLike<any>>, iteratee?: (accumulator: R, value: T[keyof T & number], index: number, str: T) => OptionalPromise<R>, accumulator?: R): Promises<R>;
   (this: Promises<T>, iteratee?: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, object: T) => OptionalPromise<T[keyof T]>, accumulator?: T[keyof T]): Promises<T[keyof T]>;
    <R>(this: Promises<T>, iteratee?: (accumulator: R, value: T[keyof T], key: keyof T, object: T) => OptionalPromise<R>, accumulator?: R): Promises<R>;
}
