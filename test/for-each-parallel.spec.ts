import { IDictionary } from '@promises/interfaces';
import forEachParallel from '@promises/for-each-parallel';
import timeout from '@promises/timeout';

describe('forEachParallel', () => {
    it('should be not iteratee on empty array and return empty array', () => {
        let count = 0;
        let array = [];
        return forEachParallel(array, () => count++).then((result: any[]) => {
            expect(count).toBe(0);
            expect(array).toBe(array);
        });
    });

    it('should be reject on iteratee error', () => {
        return forEachParallel(['foo'], () => {
            throw 'error';
        }).then(() => {
            throw 'resolve';
        }).catch((error: string) => {
            expect(error).toBe('error');
        });
    });

    it('should be iteratee series if limit set to 1', () => {
        let array = [0, 1, 2];
        let {length} = array;
        let result = [];
        return forEachParallel(array, (value) => timeout((resolve) => {
            result.push(value);
            resolve();
        }, length - value), 1).then(() => {
            expect(result).toEqual(array);
        });
    });

    it('should be parallel iterator on object with identity function and return the object', () => {
        let object: IDictionary<number> = {a: 1, b: 2, c: 3};
        return forEachParallel<IDictionary<number>>(object).then((result: IDictionary<number>) => {
            expect(object).toBe(result);
        });
    });

    it('should be parallel iterator on the array whit void iteratee and return the array without change', () => {
        let array: number[] = [0, 1, 2];
        let count: number = 0;
        return forEachParallel(array, (value, index, array) => {
            expect(value).toBe(count);
            expect(index).toBe(count);
            count++;
        }).then((returnArray: number[]) => {
            expect(count).toBe(returnArray.length);
            expect(returnArray).toBe(array);
        });
    });

    it('should be parallel iterator on the array whit parallel promises iteratee and return the array without change', () => {
        let array: number[] = [2, 0, 3, 1, 4];
        let result: number[] = [];
        let count: number = 0;
        let time = array.length;
        return forEachParallel(array, (value: number, index, array) => {
            return new Promise(resolve => {
                let time = value * 10;
                setTimeout(() => {
                    result.push(count);
                    count++;
                    resolve();
                }, time);
            });
        }).then((returnArray: number[]) => {
            expect(count).toBe(returnArray.length);
            expect(result).toEqual([0, 1, 2, 3, 4]);
            expect(returnArray).toBe(array);
        });
    });

    it('should be parallel iterator on promises array and args promises and return the array without change', () => {
        let item = Promise.resolve(0);
        let array = Promise.resolve([item]);
        let iterator = (value, index, array) => {
            expect(typeof value).toBe('number');
            expect(typeof index).toBe('number');
            expect(Array.isArray(array)).toBeTruthy();
        };
        return forEachParallel(array, iterator).then((returnArray: number[]) => {
            expect(Array.isArray(returnArray)).toBeTruthy();
        });
    });
});
