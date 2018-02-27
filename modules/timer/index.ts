/**
 * @module @promises/timer
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

/**
 * @example
 *
 * ```typescript
 *  let promise: Promise<string> = Promise.resolve<string>('foo').delay(3000);
 *
 *  timer(promise, 1500, 'error: timeout').catch((error: string) => {
 *      console.log(error); // error => 'error: timeout'
 *  })
 * ```
 */
function timer<T>(promise: Promise<T>, ms?: number, error?: any): Promise<T> {
    return new Promise((resolve, reject) => {
        let isExecute = false;
        setTimeout(() => {
            if (isExecute === false) reject(error);
            isExecute = true;
        }, ms);
        Promise.resolve(promise).then((x: any) => {
            if (isExecute === false) resolve(x);
            isExecute = true;

        }, reject);
    });
}

export default timer;
