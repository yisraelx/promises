/**
 * @module @promises/create
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import { IExecute } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let promises = create((resolve, reject) => {
 *      resolve('foo');
 *  });
 *
 *  promises.then((result: string) => {
 *      console.log(result); // => 'foo'
 *  });
 * ```
 */
function createStatic<T>(execute: IExecute<T> = (resolve) => resolve()): Promises<T> {
    return new Promises(execute);
}

export default createStatic;

Promises._setOnConstructor('create', createStatic);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  let promises = create((resolve, reject) => {
         *      resolve('foo');
         *  });
         *
         *  promises.then((result: string) => {
         *      console.log(result); // => 'foo'
         *  });
         * ```
         */
        export let create: typeof createStatic;
    }
}