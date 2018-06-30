/**
 * @module @promises/is-promise
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

/**
 * @function
 * @example
 *
 *  let promise: Promise<string> = Promise.resolve('foo');
 *
 *  console.log(isPromise(promises)); // => true
 *  console.log(isPromise('foo')); // => false
 */
function isPromise(x: any): boolean {
    return !!x && typeof x.then === 'function';
}

export default isPromise;
