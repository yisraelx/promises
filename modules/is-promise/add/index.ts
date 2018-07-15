import Promises from '@promises/core';
import isPromise from '../';

Promises._setOnConstructor('isPromise', isPromise, false);

export default Promises;

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         *  let promises: Promises<string> = Promises.resolve('foo');
         *  console.log(Promises.isPromise(promises)); // => true
         *  console.log(Promises.isPromise('foo')); // => false
         */
        export function isPromise(x: any): boolean;
    }
}
