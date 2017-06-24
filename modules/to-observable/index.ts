/**
 * @module @promises/to-observable
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { Observable, Subscriber } from 'rxjs';
import Promises from '@promises/core';

/**
 * @example
 *
 * ```typescript
 *  let promises: Promises<string> = Promises.resolve('foo');
 *  let observable: Observable<string> = toObservable(promises);
 *
 *  observable.subscribe((result: string) => {
 *      console.log(result); // result => 'foo'
 *  });
 * ```
 */
function toObservable<T>(promise: Promises<T>): Observable<T> {
    return new Observable<T>((subscriber: Subscriber<T>) => {
        promise
            .then((value: T) => {
                subscriber.next(value);
                subscriber.complete();
            }).catch((error: any) => {
                subscriber.error(error);
            });
    });
}

export default toObservable;

Promises._setOnPrototype('toObservable', toObservable, false);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let promises: Promises<string> = Promises.resolve('foo');
         *  let observable: Observable<string> = promises.toObservable();
         *
         *  observable.subscribe((result: string) => {
         *      console.log(result); // result => 'foo'
         *  });
         * ```
         */
        toObservable(promise: Promises<T>): Observable<T>;
    }
}