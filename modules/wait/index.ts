/**
 * @module @promises/wait
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import { IOptionalPromise } from '@promises/interfaces';

/**
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.resolve<string>('foo');
 *  let count: number = 0;
 *  wait(promise, () => count++ === 3, 1000).then((result: string) => {
 *    console.log(result); // result => 'foo'
 *  });
 * ```
 */
function wait<T>(value: IOptionalPromise<T>, test?: (value: T) => IOptionalPromise<boolean>, ms?: number): Promise<T> {
    return Promise.resolve(value).then((value: T) => {
        return new Promise<T>((resolve, reject) => {

            let next = () => {
                Promise.resolve(value).then(test).then((result: boolean) => {
                    result ? resolve(value) : setTimeout(next, ms);
                }).catch(reject);
            };

            next();
        });
    });
}

export default wait;
