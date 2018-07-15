import Promises from '@promises/core';
import { IExecutor } from '@promises/interfaces';
import create from '../';

Promises._setOnConstructor('create', create);

export default Promises;

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         *  let promises: Promises<string> = Promises.create<string>((resolve, reject) => {
         *      resolve('foo');
         *  });
         *
         *  promises.then((result: string) => {
         *      console.log(result); // => 'foo'
         *  });
         */
        export function create<T>(executor?: IExecutor<T>): Promises<T>;
    }
}
