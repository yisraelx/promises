/**
 * @module @promises/_keys
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

let hasEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
    enumsBugProps = [
        'toString',
        'toLocaleString',
        'valueOf',
        'hasOwnProperty',
        'isPrototypeOf',
        'propertyIsEnumerable',
        'constructor'
    ],
    { hasOwnProperty } = Object.prototype;

export default function _keys(object): string[] {
    if (Object(object) !== object) return [];
    if (typeof Object.keys === 'function') return Object.keys(object);

    let result = [];

    for (let key in object) {
        if (hasOwnProperty.call(object, key)) {
            result.push(key);
        }
    }

    if (hasEnumBug) {
        let { length: index } = enumsBugProps;
        while (--index >= 0) {
            let key = enumsBugProps[index];
            if (hasOwnProperty.call(object, key)) {
                result.push(key);
            }
        }
    }

    return result;
}