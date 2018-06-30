import Promises from '@promises/core';
import { IExecutor } from '@promises/interfaces';
import timeout from './';

Promises._setOnConstructor('timeout', timeout);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         *  let promises: Promises<string> = Promises.timeout<string>((resolve, reject)=>{
         *      resolve('foo')
         *  }, 3000);
         *
         *  promises.then((result: string)=>{
         *      console.log(result); // result => 'foo'
         *  });
         */
        export function timeout<T>(executor: IExecutor<T>, ms?: number): Promises<T>;
    }
}
