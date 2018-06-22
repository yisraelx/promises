import Promises from '@promises/core';
import delay from './';

Promises._setOnConstructor('delay', delay);

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
        export function delay<T>(ms?: number): Promises<T>;
    }
}
