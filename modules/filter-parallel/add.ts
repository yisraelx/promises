import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import filterParallel from './';

Promises._setOnPrototype('filterParallel', filterParallel);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         *  let comparator = (value: number) => {
         *      return value % 2 === 0;
         *  };
         *
         *  let array = Array.from({length:5}, (value, index) => index);
         *  let promises = Promises.resolve(array);
         *
         *  promises.filterParallel(comparator).then((result: number[])=>{
         *      console.log(result); // result => [0, 2, 4]
         *  });
         */
        filterParallel(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit?: number): Promises<T>;
        filterParallel(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit?: number): Promises<T>;
    }
}
