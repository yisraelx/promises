/**
 * @module @promises/exec
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';
import { OptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let foo = () => {
 *      return 'bar';
 *  };
 *
 *  exec(foo).then((result: string) => {
 *      console.log(result); // => 'bar'
 *  });
 * ```
 */
function execStatic<R>(fn: () => OptionalPromise<R>): Promises<R> {
    return Promises.resolve().then(fn) as Promises<R>;
}

export default execStatic;

Promises._setOnConstructor('exec', execStatic);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  let foo = () => {
         *      return 'bar';
         *  };
         *
         *  Promise.exec(foo).then((result: string) => {
         *      console.log(result); // => 'bar'
         *  });
         * ```
         */
        export let exec: typeof execStatic;
    }
}