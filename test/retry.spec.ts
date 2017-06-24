import Promises from '@promises/core';
import retry from '@promises/retry';

describe('retry', () => {
    it('should be try 1 time', () => {
        let count = 0;

        return retry(() => {
            count++;
            throw 'error';
        }).catch((error) => {
            expect(error).toBe('error');
            expect(count).toBe(1);
        });
    });

    it('should be try 3 times', () => {
        let times = 3;
        let count = 0;

        return retry(() => {
            count++;
            throw 'error';
        }, { times }).catch((error) => {
            expect(error).toBe('error');
            expect(count).toBe(times);
        });
    });


    it('should be interval prev function', () => {
        let startTime = Date.now();
        let times = 5;
        let count = 0;
        let interval = ({last}) => {
            return (last || 1) * 2;
        };
        return retry(() => {
            return new Promises((resolve, reject) => {
                count++;
                reject('error');
            });
        }, { times, interval }).catch((error) => {
            let endTime = Date.now();
            let runTime = endTime - startTime;
            let minTime = Math.pow(times - 1, 2);
            expect(runTime).toBeGreaterThanOrEqual(minTime);
            expect(error).toBe('error');
            expect(count).toBe(times);
        });
    });

    it('should be timer ms number fail', () => {
        let timer = 3;
        let ms = 5;
        let times = 3;
        let count = 0;
        return retry(() => {
            return new Promises((resolve, reject) => {
                count++;
                setTimeout(() => {
                    reject('error');
                }, ms);
            });
        }, { times, timer }).catch((error) => {
            expect(error).toBeUndefined();
            expect(count).toBe(times);
        });
    });

    it('should be timer prev function fail', () => {
        let times = 3;
        let count = 0;
        let timer = ({counter}) => {
            return counter;
        };
        return retry(() => {
            return new Promises((resolve, reject) => {
                count++;
                setTimeout(() => {
                    reject('error');
                }, (count + 1) * 2);
            });
        }, { times, timer }).catch((error) => {
            expect(error).toBeUndefined();
            expect(count).toBe(times);
        });
    });

    it('should be filter error', () => {
        let times = 3;
        let count = 0;
        let filter = ({error}) => {
            return error === 'error';
        };
        return retry(() => {
            count++;
            throw count === 2 ? 'filter' : 'error';
        }, { times, filter }).catch((error) => {
            expect(error).toBe('filter');
            expect(count).toBe(2);
        });
    });
});