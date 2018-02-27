import Promises from '@promises/core';
import { IDictionary } from '@promises/interfaces';
import forEachRightSeries from '@promises/for-each-right-series';

describe('forEachRightSeries', () => {
    it('should be series iterator on object with identity function and return the object', () => {
        let object: IDictionary<number> = { a: 1, b: 2, c: 3 };
        return forEachRightSeries(object).then((result: IDictionary<number>) => {
            expect(object).toBe(result);
        });
    });

    it('should be series iterator from right to left', () => {
        let array = [0, 1, 2];
        let result = [];
        return forEachRightSeries(array, (value, index) => {
            result.push(value * index);
        }).then(() => {
            expect(result).toEqual([4, 1, 0]);
        });
    });
});
