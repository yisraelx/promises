import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import reduceSeries from './';

Promises._setOnPrototype('reduceSeries', reduceSeries);

declare module '@promises/core' {
    interface Promises <T> {
        /**
         * @example
         *
         *  let array: number[] = [0, 1, 2, 3];
         *  let promises: Promises<number[]> = Promises.resolve<number[]>(array);
         *
         *  promises.reduceSeries((sum: number, num: number) => Promises.resolve(sum + num), 0).then((result: number) => {
         *      console.log(result); // => 6
         *  });
         */
        reduceSeries(this: Promises<T & ArrayLike<any>>, iteratee?: (accumulator: T[keyof T & number], value: T[keyof T & number], index: number, array: T) => IOptionalPromise<T[keyof T & number]>, accumulator?: T[keyof T & number]): Promises<T[keyof T & number]>;
        reduceSeries<R>(this: Promises<T & ArrayLike<any>>, iteratee?: (accumulator: R, value: T[keyof T & number], index: number, array: T) => IOptionalPromise<R>, accumulator?: R): Promises<R>;
        reduceSeries(this: Promises<T>, iteratee?: (accumulator: T[keyof T], value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<T[keyof T]>, accumulator?: T[keyof T]): Promises<T[keyof T]>;
        reduceSeries<R>(this: Promises<T>, iteratee?: (accumulator: R, value: T[keyof T], key: keyof T, object: T) => IOptionalPromise<R>, accumulator?: R): Promises<R>;

    }
}
