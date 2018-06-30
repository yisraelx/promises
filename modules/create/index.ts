/**
 * @module @promises/create
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IExecutor } from '@promises/interfaces';

/**
 * @function
 * @example
 *
 *  let promise: Promise<string> = create<string>((resolve, reject) => {
 *      resolve('foo');
 *  });
 *
 *  promise.then((result: string) => {
 *      console.log(result); // => 'foo'
 *  });
 */
function create<T>(executor: IExecutor<T> = (resolve) => resolve()): Promise<T> {
    return new Promise(executor);
}

export default create;
