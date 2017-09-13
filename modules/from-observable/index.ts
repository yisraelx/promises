/**
 * @module @promises/from-observable
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { Observable } from 'rxjs';
import Promises from '@promises/core';
/**
 * @example
 *
 * ```typescript
 *  let observable: Observable<string> = new Observable<string>((observer: Subscriber<T>) => {
 *      observer.next('foo');
 *      observer.complete();
 *  });
 *
 *  let promises: Promises<string> = fromObservable<string>(observable);
 *
 *  promises.then((result: string) => {
 *      console.log(result); // => 'foo'
 *  });
 * ```
 */
function fromObservableStatic<T>(observe: Observable<T>): Promises<T> {
    return new Promises((resolve, reject) => {
        let value: any;
        observe.subscribe((x: T) => value = x, (err: any) => reject(err), () => resolve(value));
    });
}

export default fromObservableStatic;

Promises._setOnConstructor('fromObservable', fromObservableStatic);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  let observable: Observable<string> = new Observable<string>((observer: Subscriber<T>) => {
         *      observer.next('foo');
         *      observer.complete();
         *  });
         *
         *  let promises: Promises<string> = Promises.fromObservable<string>(observable);
         *
         *  promises.then((result: string) => {
         *      console.log(result); // => 'foo'
         *  });
         * ```
         */
        export let fromObservable: typeof fromObservableStatic;
    }
}