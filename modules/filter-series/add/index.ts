import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import filterSeries from '../';

Promises._setOnPrototype('filterSeries', filterSeries);

export default Promises;

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         *  let comparator = (value) => {
         *      return value % 2 === 0;
         *  };
         *
         *  let array = [0, 1, 2, 3];
         *  let promises: Promises<number[]> = Promises.resolve(array);
         *
         *  promises.filterSeries(comparator).then((result: number[])=>{
         *      console.log(result); // [0,2]
         *  });
         */
        filterSeries(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>): Promises<T>;
        filterSeries(this: Promises<T & object>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>): Promises<T>;
    }
}
