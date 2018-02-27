import { Promises } from '@promises/-all';

describe('Promises', () => {

    it(`should be resolve array and return Promises whit array`, () => {
        let array = [0, 1, 2];
        let promise = Promises.resolve(array);
        return promise.then((result) => {
            expect(result).toEqual(array);
        });
    });

    it('should be timeout and mapped and filtered and reduce array and return sum of the array elements', () => {
        let array = [5, 2, 7, 6, 4, 8, 1, 3];

        let promise: any = Promises.timeout((resolve, reject) => {
            resolve(array);
        }, 1);

        let filtered = promise.filterParallel((time) => {
            return new Promises((resolve) => {
                setTimeout(() => resolve(time % 2 === 0), time);
            });
        }).then((result) => {
            expect(result).toEqual([2, 4, 6, 8]);
            return result;
        });

        let mapped = filtered.mapSeries((time, index, array) => {
            return new Promises((resolve) => {
                setTimeout(() => {
                    let oppiset = Math.abs((array.length - 1) - index);
                    let result = array[oppiset] + time;
                    resolve(result);
                }, time);
            });
        }).then((result) => {
            expect(result).toEqual([10, 10, 10, 10]);
            return result;
        });

        return mapped.reduceSeries((a, v) => a + v).then((result) => {
            expect(result).toBe(10 * 4);
        });
    });

});
