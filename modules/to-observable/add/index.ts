import Promises from '@promises/core';
import { Observable } from 'rxjs';
import toObservable from '../';

Promises._setOnPrototype('toObservable', toObservable, false);

export default Promises;

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         *  let promises: Promises<string> = Promises.resolve('foo');
         *  let observable: Observable<string> = promises.toObservable();
         *
         *  observable.subscribe((result: string) => {
         *      console.log(result); // result => 'foo'
         *  });
         */
        toObservable(promise: Promises<T>): Observable<T>;
    }
}
