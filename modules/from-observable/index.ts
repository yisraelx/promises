/**
 * @module @promises/from-observable
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { Observable } from 'rxjs';

/**
 * @function
 * @example
 *
 *  let observable: Observable<string> = new Observable<string>((observer: Subscriber<T>) => {
 *      observer.next('foo');
 *      observer.complete();
 *  });
 *
 *  let promise: Promise<string> = fromObservable<string>(observable);
 *
 *  promise.then((result: string) => {
 *      console.log(result); // => 'foo'
 *  });
 */
function fromObservable<T>(observe: Observable<T>): Promise<T> {
    return new Promise((resolve, reject) => {
        let value: any;
        observe.subscribe((x: T) => value = x, (err: any) => reject(err), () => resolve(value));
    });
}

export default fromObservable;
