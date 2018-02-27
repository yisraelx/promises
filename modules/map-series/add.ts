import Promises from '@promises/core';
import { IDictionary, IOptionalPromise } from '@promises/interfaces';
import mapSeries from './';

Promises._setOnPrototype('mapSeries', mapSeries);

export default mapSeries;

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
         *  let promises Promises<number[]> = Promises.resolve<number[]>(array);
         *
         *  promises.mapSeries(mapper).then((result: number[]) => {
         *      console.log(result); // result => [0, 1, 2, 3, 4]
         *  });
         * ```
         */
        mapSeries(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<T[keyof T & number]>): Promises<T>;
        mapSeries<R>(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<R>): Promises<R[]>;
        mapSeries(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>): Promises<T>;
        mapSeries<R>(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>): Promises<IDictionary<R>>;
    }
}
