import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import retry, { IRetryOptions } from './';

Promises._setOnConstructor('retry', retry);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         *  let count: number = 0;
         *  let promises: Promises<string> = Promises.retry(()=>{
         *      if(count++ < 2)  throw 'error';
         *      return 'foo';
         *  }, {times: 3});
         *
         *  promises.then((result: string) => {
         *      console.log(result); // => 'foo'
         *  });
         */
        export function retry<R>(fn: () => IOptionalPromise<R>, options?: IRetryOptions): Promises<R>;
    }
}
