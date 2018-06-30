/**
 * @module @promises/exec
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';

/**
 * @function
 * @example
 *
 *  let foo = () => {
 *      return 'bar';
 *  };
 *
 *  exec(foo).then((result: string) => {
 *      console.log(result); // => 'bar'
 *  });
 */
function exec<R>(fn: () => IOptionalPromise<R>): Promise<R> {
    return Promise.resolve().then(fn) as Promise<R>;
}

export default exec;
