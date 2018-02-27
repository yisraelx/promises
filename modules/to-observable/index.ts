/**
 * @module @promises/to-observable
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { Observable, Subscriber } from 'rxjs';

/**
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.resolve('foo');
 *  let observable: Observable<string> = toObservable(promise);
 *
 *  observable.subscribe((result: string) => {
 *      console.log(result); // result => 'foo'
 *  });
 * ```
 */
function toObservable<T>(promise: Promise<T>): Observable<T> {
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
