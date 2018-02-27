import reduceRightSeries from '@promises/reduce-right-series';

describe(`reduceRightSeries`, () => {
    it(`should be reduce the array and return promise with index of the first max element from right`, () => {
        let collection = [0, 6, -1, 8, 3, 4, 5, 3, 1, 8, 2];
        return reduceRightSeries(collection, (maxIndex: number, value: number, index: number) => {
            return maxIndex === -1 || value > collection[maxIndex] ? index : maxIndex;
        }, -1).then((maxIndex) => {
            expect(maxIndex).toBe(9);
        });
    });
});
