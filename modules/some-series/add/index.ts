import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import someSeries from '../';

Promises._setOnPrototype('someSeries', someSeries);

export default Promises;

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         *  let array: any[] = [0, null, true, false];
         *  let promises = Promises.resolve(array);
         *
         *  promises.someSeries().then((result: boolean) => {
         *    console.log(result); // result => true
         *  });
         */
        someSeries(this: Promises<T & string>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): Promises<boolean>;
        someSeries(this: Promises<T & object>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promises<boolean>;
    }
}
