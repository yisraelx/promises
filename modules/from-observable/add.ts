import Promises from '@promises/core';
import { Observable } from 'rxjs';
import fromObservable from './';

Promises._setOnConstructor('fromObservable', fromObservable);

export default fromObservable;

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
        export function fromObservable<T>(observe: Observable<T>): Promises<T>;
    }
}
