/**
 * @module @promises/delay
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

/**
 * @function
 * @param ms The number of milliseconds to delay invocation.
 * @example
 *
 *  delay(3000).then(() => {
 *    console.log('timeout'); // => 'timeout'
 *  });
 */
function delay<T>(ms?: number): Promise<T> {
    return new Promise<T>((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

export default delay;
