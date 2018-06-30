import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import everyParallel from './';

Promises._setOnPrototype('everyParallel', everyParallel);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         *  let comparator = (value) => {
         *      return Promises.resolve(Boolean(value))
         *  };
         *
         *  let array: any[] = [true, 1, Promises.resolve(null), 'yes'];
         *  let promises: Promises<any[]> = Promises.resolve(array);
         *
         *  promises.everyParallel(comparator).then((result: boolean)=>{
         *      console.log(result) // result => false
         *  });
         */
        everyParallel<T extends ArrayLike<any>>(this: Promises<T & string>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit?: number): Promises<boolean>;
        everyParallel<T>(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit?: number): Promises<boolean>;
    }
}
