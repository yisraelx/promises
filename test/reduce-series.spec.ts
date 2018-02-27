import Promises from '@promises/core';
import reduceSeries from '@promises/reduce-series';

describe(`reduceSeries`, () => {

    it(`should be reduce undefined collection and return undefined`, () => {
        return (reduceSeries as any)().then(result => {
            expect(result).toBeUndefined();
        });
    });

    it('should be reduce on array with identity function and return the first element', () => {
        let array: number[] = [0, 1, 2];
        return reduceSeries(array).then((result: number) => {
            expect(array[0]).toBe(result);
        });
    });

    it(`should be reduce array series`, () => {
        let collection = [4, 0, 3, 1, 2];
        return reduceSeries(collection, (accumulator, current) => {
            return new Promises((resolve) => {
                let time = current * 10;
                setTimeout(() => {
                    accumulator.push(current);
                    resolve(accumulator);
                }, time);
            });
        }, []).then((accumulator) => {
            expect(accumulator).toEqual(collection);
        });
    });

    it(`should be reduce the array and return promises whit max element`, () => {
        let collection = [0, 6, -1, 8, 9, 4, 5, Promises.resolve(3), 1, 8, 2];
        return reduceSeries(collection, (max: number, current: number): number => Math.max(max, current)).then((accumulator: number) => {
            expect(accumulator).toBe(9);
        });
    });

    it(`should be reduce the array and return promises whit sum of the array elements`, () => {
        let collection = Promises.resolve([Promises.resolve(0), 1, 2, 3, 4, 5]);
        return reduceSeries(collection, (accumulator: number, current: number) => accumulator + current).then((accumulator: number) => {
            expect(accumulator).toBe(15);
        });
    });

    it(`should be reduce the array and return promises with even numbers`, () => {
        let collection = [Promises.resolve(0), 1, 2, 3, 4, 5];
        return reduceSeries(collection, (accumulator: number[], current: number): number[] => {
            if (current % 2 === 0) accumulator.push(current);
            return accumulator;
        }, []).then((accumulator) => {
            expect(accumulator.length).toBe(3);
            expect(accumulator).toEqual([0, 2, 4]);
        });
    });

    it(`should be reduce the object and return promises with keys of positive number value`, () => {
        let collection = {a: -1, b: 0, c: 5, d: -6, e: 9, f: 2};
        return reduceSeries(collection, (accumulator: string[], value: number, key: string): string[] => {
            if (value >= 0) accumulator.push(key);
            return accumulator;
        }, []).then((accumulator: string[]) => {
            expect(accumulator.length).toBe(4);
            expect(accumulator).toEqual(['b', 'c', 'e', 'f']);
        });
    });

});
