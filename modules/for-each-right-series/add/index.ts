import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import forEachRightSeries from '../';

Promises._setOnPrototype('forEachRightSeries', forEachRightSeries);

export default Promises;

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         *  let array: number[] = [3, 7, 1, 5];
         *  let promises: Promises<number[]> = Promises.resolve(array);
         *
         *  console.log('before');
         *  promises.forEachRightSeries((value: number) => {
         *      console.log(`start: ${ value }`);
         *      return timeout((resolve) => {
         *          console.log(`end: ${ value }`);
         *          resolve();
         *      }, value);
         *  }).then(() => {
         *      console.log('complete');
         *  });
         *  console.log('after');
         *
         *  // => before
         *  // => after
         *  // => start 5
         *  // => end 5
         *  // => start 1
         *  // => end 1
         *  // => start 7
         *  // => end 7
         *  // => start 3
         *  // => end 3
         *  // => complete
         */
        forEachRightSeries(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>): Promises<T>;
        forEachRightSeries(this: Promises<T & object>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>): Promises<T>;
    }
}
