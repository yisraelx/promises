/**
 * @module @promises/timer
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

/**
 * @function
 * @param ms The number of milliseconds that if no resolve then reject with `error`
 * @param message The error message for the rejection
 * @example
 *
 *  let promise: Promise<string> = Promise.resolve<string>('foo').delay(3000);
 *
 *  timer(promise, 1500, 'error: timeout').catch((error: string) => {
 *      console.log(error); // error => 'error: timeout'
 *  });
 */
function timer<T>(promise: Promise<T>, ms?: number, message?: any): Promise<T> {
    return new Promise((resolve, reject) => {
        let isExecute = false;
        setTimeout(() => {
            if (isExecute === false) reject(message);
            isExecute = true;
        }, ms);
        Promise.resolve(promise).then((x: any) => {
            if (isExecute === false) resolve(x);
            isExecute = true;

        }, reject);
    });
}

export default timer;
