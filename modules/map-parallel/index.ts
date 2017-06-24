/**
 * @module @promises/map-parallel
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import forEach from '@promises/for-each-parallel';
import createMap from '@promises/_create-map';
import { IMap, IMapWrapper } from '@promises/interfaces';

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
 *
 *  mapParallel(array, mapper).then((result) => {
 *      console.log(result); // result => [1, 4, 2, 0, 3]
 *  });
 * ```
 */
let mapParallel: IMap = createMap(forEach) as IMap;

export default mapParallel;

Promises._setOnPrototype('mapParallel', mapParallel);

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
         *  promises.mapParallel(mapper).then((result) => {
         *      console.log(result); // result => [1, 4, 2, 0, 3]
         *  });
         * ```
         */
        mapParallel: IMapWrapper<T>;
    }
}