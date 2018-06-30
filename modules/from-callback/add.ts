import Promises from '@promises/core';
import fromCallback from './';

Promises._setOnConstructor('fromCallback', fromCallback);

declare module '@promises/core' {
    namespace Promises {
        /**
         * @example
         *
         *  let readDir = fs.readdir.bind(null, process.cwd());
         *  Promises.fromCallback<string[]>(readDir).then((result: string[]) => {
         *      console.log(result);
         *  });
         */
        export function fromCallback<R>(fn: (callback: (error?: any, ...result: R[keyof R & number][]) => void) => void, multi: true): Promises<R>;
        export function fromCallback<R>(fn: (callback: (error?: any, result?: R) => void) => void, multi?: false): Promises<R>;
    }
}
