import Promises from '@promises/core';
import timesParallel from '@promises/times-parallel';

describe('timesParallel', () => {
    it('should be return times result', () => {
        let times = Promises.resolve(3);
        return timesParallel(times, time => time).then((result) => {
            expect(result).toEqual([0, 1, 2]);
        });
    });

    it('should be exec 3 times in parallel', () => {
        let times = 3;
        let mss = [3, 5, 1];
        let result = [];
        return timesParallel(times, time => {
            return new Promises((resolve, reject) => {
                let ms = mss[time];
                setTimeout(() => {
                    result.push(time);
                    resolve();
                }, ms);
            });
        }).then(() => {
            expect(result).toEqual([2, 0, 1]);
        });
    });
});
