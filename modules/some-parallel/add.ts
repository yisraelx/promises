import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import someParallel from './';

Promises._setOnPrototype('someParallel', someParallel);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         *  let array: any[] = [0, null, true, false];
         *  let promises: Promises<any[]> = Promises.resolve(array);
         *
         *  promises.someParallel().then((result: boolean) => {
         *    console.log(result); // result => true
         *  });
         */
        someParallel<T extends ArrayLike<any>>(this: Promises<T & string>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit?: number): Promises<boolean>;
        someParallel<T>(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit?: number): Promises<boolean>;
    }
}
