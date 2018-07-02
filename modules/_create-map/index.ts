/**
 * @module @promises/_create-map
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

/**
 * @function
 * @private
 */
export default function _createMap(iterator) {
    return (collection?, iteratee: Function = v => v, limit?) => {
        return Promise.resolve(collection).then((collection = []) => {
            let result = Array.isArray(collection) ? Array(collection.length) : {};
            return iterator(collection, (value, key, collection) => {
                let getNewValue = iteratee(value, key, collection);
                return Promise.resolve(getNewValue).then((newValue) => {
                    result[key] = newValue;
                });
            }, limit).then(() => {
                return result;
            });
        });
    };
}
