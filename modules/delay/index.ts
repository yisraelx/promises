/**
 * @module @promises/delay
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import Promises from '@promises/core';

/**
 * @example
 *
 * ```typescript
 *  delay(3000).then(() => {
 *    console.log('timeout'); // => 'timeout'
 *  });
 * ```
 */
function delayStatic<T>(ms?: number): Promises<T> {
    return new Promises<T>((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

export default delayStatic;

Promises._setOnConstructor('delay', delayStatic);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  Promises.delay(3000).then(() => {
         *    console.log('timeout'); // => 'timeout'
         *  });
         * ```
         */
        export let delay: typeof delayStatic;
    }
}
