import timesParallel from '@promises/times-parallel';
import timeout from '@promises/timeout';

describe('timesParallel', () => {
    it('should be iteratee 0 times and return empty array', () => {
        let count = 0;
        return timesParallel(0, () => count++).then((result: any[]) => {
            expect(count).toBe(0);
            expect(result).toEqual([]);
        });
    });

    it('should be reject on iteratee error', () => {
        return timesParallel(1, () => {
            throw 'error';
        }).then(() => {
            throw 'resolve';
        }).catch((error: string) => {
            expect(error).toBe('error');
        });
    });

    it('should be iteratee series if limit set to 1', () => {
        let times = 3;
        let result = [];
        return timesParallel(3, (time) => timeout((resolve) => {
            result.push(time);
            resolve();
        }, times - time), 1).then(() => {
            expect(result).toEqual([0, 1, 2]);
        });
    });

    it('should be return times result', () => {
        let times = Promise.resolve(3);
        return timesParallel(times, time => time).then((result) => {
            expect(result).toEqual([0, 1, 2]);
        });
    });

    it('should be exec 3 times in parallel', () => {
        let times = 3;
        let mss = [3, 5, 1];
        let result = [];
        return timesParallel(times, time => {
            return new Promise((resolve, reject) => {
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
