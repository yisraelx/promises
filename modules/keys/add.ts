import Promises from '@promises/core';
import { IDictionary } from '@promises/interfaces';
import keys from './';

Promises._setOnPrototype('keys', keys);

declare module '@promises/core' {
    interface Promises<T> {
        /**
         * @example
         *
         *  let array: number[] = [0, 1, 2];
         *  let promises: Promises<number[]> = Promises.resolve(array);
         *
         *  promises.keys().then((keys: string[]) => {
         *      console.log(keys); // => ['0', '1', '2']
         *  });
         */
        keys(this: Promises<T & ArrayLike<any>>): Promises<string[]>;
        keys(this: Promises<T & object>): Promises<string[]>;
    }
}
