/**
 * @module @promises/_curry
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

import curry from '@pakal/curry';

/**
 * @function
 * @private
 */
function _curry(fn: Function, length: number = fn.length) {
    return curry((function () {
        let {length} = arguments;
        let args = Array(length);

        if (length) {
            args[0] = arguments[--length];
            for (let i = 0; i < length; i++) {
                args[i + 1] = arguments[i];
            }
        }

        return fn.apply(this, args);
    }), length) as any;
}

export { __ } from '@pakal/curry';
export default _curry;
