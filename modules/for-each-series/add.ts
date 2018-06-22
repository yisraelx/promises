import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import forEachSeries from './';

Promises._setOnPrototype('forEachSeries', forEachSeries);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         * ```typescript
         *  let array: number[] = [3, 7, 1, 5];
         *  let promises: Promises<number[]> = Promises.resolve(array);
         *
         *  console.log('before');
         *  promises.forEachSeries((value: number) => {
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
         *  // => start 3
         *  // => end 3
         *  // => start 7
         *  // => end 7
         *  // => start 1
         *  // => end 1
         *  // => start 5
         *  // => end 5
         *  // => complete
         * ```
         */
        forEachSeries(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>): Promises<T>;
        forEachSeries(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>): Promises<T>;
    }
}
