import Promises from '@promises/core';
import { IDictionary, IOptionalPromise } from '@promises/interfaces';
import parallel from '../';

Promises._setOnConstructor('parallel', parallel);

export default Promises;

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         *  let fn = (id: string, ms: number) => () => timeout((resolve) => {
         *      console.log(id);
         *      resolve(id);
         *  }, ms);
         *  let functions = [
         *      fn('zero', 7),
         *      fn('one', 3),
         *      fn('two', 5)
         *  ];
         *
         *  Promises.parallel(functions).then((result: string[]) => {
         *      console.log(result);
         *  });
         *
         *  // => 'one'
         *  // => 'two'
         *  // => 'zero'
         *  // => ['zero', 'one', 'two']
         */
        export function parallel<R>(array: (() => IOptionalPromise<R>)[], limit?: number): Promises<R[]>;
        export function parallel<R extends ArrayLike<any>>(array: (() => IOptionalPromise<R[keyof R & number]>)[], limit?: number): Promises<R>;
        export function parallel<R>(object: IDictionary<(() => IOptionalPromise<R>)>, limit?: number): Promises<IDictionary<R>>;
        export function parallel<R extends IDictionary<any>>(object: IDictionary<(() => IOptionalPromise<R[keyof R]>)>, limit?: number): Promises<R>;
    }
}
