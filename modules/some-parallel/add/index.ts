import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import someParallel from '../';

Promises._setOnPrototype('someParallel', someParallel);

export default Promises;

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
        someParallel(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit?: number): Promises<boolean>;
        someParallel(this: Promises<T & object>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit?: number): Promises<boolean>;
    }
}
