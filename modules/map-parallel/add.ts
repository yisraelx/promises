import Promises from '@promises/core';
import { IDictionary, IOptionalPromise } from '@promises/interfaces';
import mapParallel from './';

Promises._setOnPrototype('mapParallel', mapParallel);

export default mapParallel;

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         * ```typescript
         *  let mapper = (time: number) => {
         *      return Promises.timeout((resolve) => {
         *          resolve(count++);
         *      }, time);
         *  };
         *
         *  let count: number = 0;
         *  let array: number[] = [7, 1, 6, 9, 3];
         *  let promises = Promises.resolve(array);
         *
         *  promises.mapParallel(mapper).then((result: number[]) => {
         *      console.log(result); // result => [1, 4, 2, 0, 3]
         *  });
         * ```
         */
        mapParallel(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<T[keyof T & number]>, limit?: number): Promises<T>;
        mapParallel<R>(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<R>, limit?: number): Promises<R[]>;
        mapParallel(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>, limit?: number): Promises<T>;
        mapParallel<R>(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>, limit?: number): Promises<IDictionary<R>>;
    }
}
