import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import rejectParallel from './';

Promises._setOnPrototype('rejectParallel', rejectParallel);

export default rejectParallel;

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let array: any[] = ['yes', null, 0, true];
         *  let promises: Promises<any[]> = Promises.resolve(array);
         *
         *  promises.rejectParallel().then((result: any[]) => {
         *      console.log(result); // => [null, 0]
         *  });
         * ```
         */
        rejectParallel(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): Promises<T>;
        rejectParallel(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promises<T>;
    }
}
