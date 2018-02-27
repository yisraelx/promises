import timesSeries from '@promises/times-series';

describe('timesSeries', () => {
    it('should be return array times index result', () => {
        let times = Promise.resolve(3);
        return timesSeries(times, time => time).then((result) => {
            expect(result).toEqual([0, 1, 2]);
        });
    });

    it('should be exec 3 times in parallel', () => {
        let times = 3;
        let mss = [3, 5, 1];
        let result = [];
        return timesSeries(times, time => {
            return new Promise((resolve, reject) => {
                let ms = mss[time];
                setTimeout(() => {
                    result.push(time);
                    resolve();
                }, ms);
            });
        }).then(() => {
            expect(result).toEqual([0, 1, 2]);
        });
    });
});
