/**
 * @module @promises/promisify
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';

export interface IPromisifyOptions {
    context?: any;
    multi?: boolean;
}

/**
 * @function
 * @example
 *
 *  function pass<T>(value: T, cb: (error:any, result: T) => void){
 *      cb(null, value);
 *  }
 *
 *  let passWrap: <T>(text: T) => Promise<T> = promisify(pass);
 *  let promise: Promise<string> = passWrap<string>('foo');
 *
 *  promise.then((result: string) => {
 *      console.log(result); // result => 'foo';
 *  });
 */
function promisify<R>(fn: (cb: (error: any, ...result: R[keyof R & number][]) => void) => void, options: { multi: true, context?: any }): () => Promise<R>;
function promisify<P1, R>(fn: (p1: P1, cb: (error: any, ...result: R[keyof R & number][]) => void) => void, options: { multi: true, context?: any }): (p1: IOptionalPromise<P1>) => Promise<R>;
function promisify<P1, P2, R>(fn: (p1: P1, p2: P2, cb: (error: any, ...result: R[keyof R & number][]) => void) => void, options: { multi: true, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>) => Promise<R>;
function promisify<P1, P2, P3, R>(fn: (p1: P1, p2: P2, p3: P3, cb: (error: any, ...result: R[keyof R & number][]) => void) => void, options: { multi: true, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>) => Promise<R>;
function promisify<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, cb: (error: any, ...result: R[keyof R & number][]) => void) => void, options: { multi: true, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>) => Promise<R>;
function promisify<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, cb: (error: any, ...result: R[keyof R & number][]) => void) => void, options: { multi: true, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>) => Promise<R>;
function promisify<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, cb: (error: any, ...result: R[keyof R & number][]) => void) => void, options: { multi: true, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>) => Promise<R>;
function promisify<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, cb: (error: any, ...result: R[keyof R & number][]) => void) => void, options: { multi: true, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>) => Promise<R>;
function promisify<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, cb: (error: any, ...result: R[keyof R & number][]) => void) => void, options: { multi: true, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>, p8: IOptionalPromise<P8>) => Promise<R>;
function promisify<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9, cb: (error: any, ...result: R[keyof R & number][]) => void) => void, options: { multi: true, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>, p8: IOptionalPromise<P8>, p9: IOptionalPromise<P9>) => Promise<R>;
function promisify<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9, p10: P10, cb: (error: any, ...result: R[keyof R & number][]) => void) => void, options: { multi: true, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>, p8: IOptionalPromise<P8>, p9: IOptionalPromise<P9>, p10: IOptionalPromise<P10>) => Promise<R>;
function promisify<R>(fn: (cb: (error: any, result: R) => void) => void, options?: { multi?: false, context?: any }): () => Promise<R>;
function promisify<P1, R>(fn: (p1: P1, cb: (error: any, result: R) => void) => void, options?: { multi?: false, context?: any }): (p1: IOptionalPromise<P1>) => Promise<R>;
function promisify<P1, P2, R>(fn: (p1: P1, p2: P2, cb: (error: any, result: R) => void) => void, options?: { multi?: false, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>) => Promise<R>;
function promisify<P1, P2, P3, R>(fn: (p1: P1, p2: P2, p3: P3, cb: (error: any, result: R) => void) => void, options?: { multi?: false, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>) => Promise<R>;
function promisify<P1, P2, P3, P4, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, cb: (error: any, result: R) => void) => void, options?: { multi?: false, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>) => Promise<R>;
function promisify<P1, P2, P3, P4, P5, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, cb: (error: any, result: R) => void) => void, options?: { multi?: false, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>) => Promise<R>;
function promisify<P1, P2, P3, P4, P5, P6, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, cb: (error: any, result: R) => void) => void, options?: { multi?: false, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>) => Promise<R>;
function promisify<P1, P2, P3, P4, P5, P6, P7, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, cb: (error: any, result: R) => void) => void, options?: { multi?: false, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>) => Promise<R>;
function promisify<P1, P2, P3, P4, P5, P6, P7, P8, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, cb: (error: any, result: R) => void) => void, options?: { multi?: false, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>, p8: IOptionalPromise<P8>) => Promise<R>;
function promisify<P1, P2, P3, P4, P5, P6, P7, P8, P9, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9, cb: (error: any, result: R) => void) => void, options?: { multi?: false, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>, p8: IOptionalPromise<P8>, p9: IOptionalPromise<P9>) => Promise<R>;
function promisify<P1, P2, P3, P4, P5, P6, P7, P8, P9, P10, R>(fn: (p1: P1, p2: P2, p3: P3, p4: P4, p5: P5, p6: P6, p7: P7, p8: P8, p9: P9, p10: P10, cb: (error: any, result: R) => void) => void, options?: { multi?: false, context?: any }): (p1: IOptionalPromise<P1>, p2: IOptionalPromise<P2>, p3: IOptionalPromise<P3>, p4: IOptionalPromise<P4>, p5: IOptionalPromise<P5>, p6: IOptionalPromise<P6>, p7: IOptionalPromise<P7>, p8: IOptionalPromise<P8>, p9: IOptionalPromise<P9>, p10: IOptionalPromise<P10>) => Promise<R>;
function promisify(fn, {multi, context}: IPromisifyOptions = {}) {
    return function (...args) {
        return Promise.all(args).then((args) => {
            return new Promise((resolve, reject) => {
                fn.call(context || this, ...args, (error, ...result) => {
                    if (error) return reject(error);
                    if (result && !multi) result = result[0];
                    resolve(result);
                });
            });
        });
    };
}


export default promisify;
