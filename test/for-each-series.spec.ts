import Promises from '@promises/core';
import { Dictionary } from '@promises/interfaces';
import forEachSeries from '@promises/for-each-series';

describe('forEachSeries', () => {
    it('should be series iterator on array with identity function and return the array', () => {
        let array: number[] = [0, 1, 2];
        return forEachSeries(array).then((result: number[]) => {
            expect(array).toBe(result);
        });
    });

    it('should be series iterator on the object whit void iteratee and return the object without change', () => {
        let object: Dictionary<number> = { a: 0, b: 1, c: 2 };
        let objectKeys = Object.keys(object);
        let count: number = 0;
        return forEachSeries(object, (value, key, object) => {
            expect(value).toBe(count);
            expect(key).toBe(objectKeys[count]);
            count++;
        }).then((returnObject: Dictionary<number>) => {
            expect(count).toBe(objectKeys.length);
            expect(returnObject).toBe(object);
        });
    });

    it('should be series iterator on the array whit parallel promise iteratee and return the array without change', () => {
        let array: number[] = [0, 1, 2];
        let count: number = 0;
        let length = array.length;
        return forEachSeries(array, (value, index, array) => {
            let time = length-- * 10;
            return new Promises(resolve => {
                setTimeout(() => {
                    expect(value).toBe(count);
                    expect(index).toBe(count);
                    count++;
                    resolve();
                }, time);
            });
        }).then((returnArray: number[]) => {
            expect(count).toBe(returnArray.length);
            expect(array).toBe(returnArray);
        });
    });

    it('should be series iterator on promise array and args promise and return the array without change', () => {
        let item = Promises.resolve(0);
        let array = Promises.resolve([item]);
        let iterator = (value, index, array) => {
            expect(typeof value).toBe('number');
            expect(typeof index).toBe('number');
            expect(Array.isArray(array)).toBeTruthy();
        };
        return forEachSeries(array, iterator).then((returnArray) => {
            expect(Array.isArray(returnArray)).toBeTruthy();
        });
    });
});