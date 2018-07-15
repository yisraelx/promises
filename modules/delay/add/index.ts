import Promises from '@promises/core';
import delay from '../';

Promises._setOnConstructor('delay', delay);

export default Promises;

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         *  Promises.delay(3000).then(() => {
         *    console.log('timeout'); // => 'timeout'
         *  });
         */
        export function delay<T>(ms?: number): Promises<T>;
    }
}
