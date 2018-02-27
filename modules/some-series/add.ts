import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import someSeries from './';

Promises._setOnPrototype('someSeries', someSeries);

export default someSeries;

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let array: any[] = [0, null, true, false];
         *  let promises = Promises.resolve(array);
         *
         *  promises.someSeries().then((result: boolean) => {
         *    console.log(result); // result => true
         *  });
         * ```
         */
        someSeries<T extends ArrayLike<any>>(this: Promises<T & string>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): Promises<boolean>;
        someSeries<T>(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promises<boolean>;
    }
}
