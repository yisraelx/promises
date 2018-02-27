/**
 * @module @promises/map-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import forEach from '@promises/for-each-series';
import createMap from '@promises/_create-map';
import { IMap, IMapWrapper } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let mapper = (time: number) => {
 *      return Promises.timeout((resolve) => {
 *          resolve(index);
 *      }, time);
 *  };
 *
 *  let count: number = 0;
 *  let array: number[] = [7, 1, 6, 9, 3];
 *
 *  mapSeries(array, mapper).then((result) => {
 *      console.log(result); // result => [0, 1, 2, 3, 4]
 *  });
 * ```
 */
let mapSeries: IMap = createMap(forEach) as IMap;

export default mapSeries;

Promises._setOnPrototype('mapSeries', mapSeries);

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
         *  promises.mapSeries(mapper).then((result) => {
         *      console.log(result); // result => [0, 1, 2, 3, 4]
         *  });
         * ```
         */
        mapSeries: IMapWrapper<T>;
    }
}
