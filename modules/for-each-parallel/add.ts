import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import forEachParallel from './';

Promises._setOnPrototype('forEachParallel', forEachParallel);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         *  let array: number[] = [3, 7, 1, 5];
         *  let promises: Promises<number[]> = Promises.resolve<number[]>(array);
         *
         *  console.log('before');
         *  promises.forEachParallel((value: number) => {
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
         *  // => start 7
         *  // => start 1
         *  // => start 5
         *  // => end 1
         *  // => end 3
         *  // => end 5
         *  // => end 7
         *  // => complete
         */
        forEachParallel(this: Promises<T & ArrayLike<any>>, iteratee?: (value: T[keyof T & number], index: number, array: T) => IOptionalPromise<any>, limit?: number): Promises<T>;
        forEachParallel(this: Promises<T>, iteratee?: (value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<any>, limit?: number): Promises<T>;
    }
}
