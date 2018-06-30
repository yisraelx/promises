import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import everySeries from './';

Promises._setOnPrototype('everySeries', everySeries);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         *  let comparator = (value) => {
         *      return Promises.resolve(Boolean(value));
         *  };
         *
         *  let array: any[] = ['foo', true, Promises.resolve(-1)];
         *  let promises: Promises<any[]> = Promises.resolve(array);
         *
         *  promises.everySeries(comparator).then((result: boolean)=>{
         *      console.log(result); // result => true
         *  });
         */
        everySeries<T extends ArrayLike<any>>(this: Promises<T & string>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): Promises<boolean>;
        everySeries<T>(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promises<boolean>;
    }
}
