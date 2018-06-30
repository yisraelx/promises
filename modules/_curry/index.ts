/**
 * @module @promises/_curry
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

export interface ICurryOptions {
    length?: number;
    order?: number[];
}

/**
 * @function
 * @private
 */
export default function _curry(fn: Function, { length = fn.length, order}: ICurryOptions = {}) {
    order = Array.isArray(order) ? order : [length - 1].concat(Array.apply(null, Array(length - 1)).map((v, i) => i));

    let next = (allArgs: any[]) => {
        if (allArgs.length >= length) {
            let execArgs = Array(length);
            for (let i = 0; i < length; i++) {
                let index = order[i];
                let value = allArgs[index];
                execArgs[i] = value;
            }
            return fn.apply(null, execArgs);
        }
        return (...currentArgs: any[]) => {
            allArgs = allArgs.concat(currentArgs);
            return next(allArgs);
        };
    };

    return next([]);
}
