import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import exec from '../';

Promises._setOnConstructor('exec', exec);

export default Promises;

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         *  let foo = () => {
         *      return 'bar';
         *  };
         *
         *  Promises.exec(foo).then((result: string) => {
         *      console.log(result); // => 'bar'
         *  });
         */
        export function exec<R>(fn: () => IOptionalPromise<R>): Promises<R>;
    }
}
