/**
 * @module @promises/delay
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

/**
 * @example
 *
 * ```typescript
 *  delay(3000).then(() => {
 *    console.log('timeout'); // => 'timeout'
 *  });
 * ```
 */
function delay<T>(ms?: number): Promise<T> {
    return new Promise<T>((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}

export default delay;
