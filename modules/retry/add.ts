import Promises from '@promises/core';
import { IOptionalPromise } from '@promises/interfaces';
import retry, { IRetryOptions } from './';

Promises._setOnConstructor('retry', retry);

export { IRetryFilterInfo, IRetryOptions, IRetryTimeInfo } from './';
export default retry;

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         * ```typescript
         *  let count = 0;
         *  let promises = Promises.retry(()=>{
         *  if(count++ < 2)  throw 'error';
         *      return 'foo';
         *  }, {times: 3})
         *
         *  promises.then((result) => {
         *      console.log(result); // => 'foo'
         *  })
         * ```
         */
        export function retry<R>(fn: () => IOptionalPromise<R>, options?: IRetryOptions): Promises<R>;
    }
}