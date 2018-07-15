import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import everyParallel from '../';

Promises._setOnPrototype('everyParallel', everyParallel);

export default Promises;

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
        everyParallel(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<boolean>, limit?: number): Promises<boolean>;
        everyParallel(this: Promises<T & object>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<boolean>, limit?: number): Promises<boolean>;
    }
}
