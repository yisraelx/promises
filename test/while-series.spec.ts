import whileSeries from '@promises/while-series';
import timeout from '@promises/timeout';

describe('whileSeries', () => {

    it('should be not iteratee if test not pass', () => {
        let test = 0;
        let iteratee = 0;
        return whileSeries(() => {
            test++;
            return false;
        }, () => {
            iteratee++;
        }).then(() => {
            expect(test).toBe(1);
            expect(iteratee).toBe(0);
        });
    });

    it('should be iteratee without iteratee function', () => {
        let index = 0;
        return whileSeries(() => {
            return index++ < 5;
        }).then(() => {
            expect(index).toBe(6);
        });
    });

    it('should be reject on test error', () => {
        return whileSeries(() => {
            throw 'test';
        }, () => {
            throw 'iteratee';
        }).then(() => {
            throw 'resolve';
        }).catch((error) => {
            expect(error).toBe('test');
        });
    });

    it('should be reject on iteratee error', () => {
        let stop = false;
        return whileSeries(() => {
            return stop = !stop;
        }, () => {
            throw 'iteratee';
        }).then(() => {
            throw 'resolve';
        }).catch((error) => {
            expect(error).toBe('iteratee');
        });
    });

    it('should be iteratee series 5 times', () => {
        let count = 0;
        let length = 5;
        let test = [];
        let iteratee = [];
        return whileSeries(() => {
            test.push(count);
            return count++ < length;
        }, () => {
            iteratee.push(count);
        }).then(() => {
            expect(count).toBe(6);
            expect(test).toEqual([0, 1, 2, 3, 4, 5]);
            expect(iteratee).toEqual([1, 2, 3, 4, 5]);
        });
    });

    it('should be iteratee series 5 times with promise iteratee', () => {
        let count = 0;
        let length = 5;
        let test = [];
        let iteratee = [];
        return whileSeries(() => {
            test.push(count);
            return count++ < length;
        }, () => {
            return timeout((resolve) => {
                iteratee.push(count);
                resolve();
            }, length - count);
        }).then(() => {
            expect(count).toBe(6);
            expect(test).toEqual([0, 1, 2, 3, 4, 5]);
            expect(iteratee).toEqual([1, 2, 3, 4, 5]);
        });
    });

    it('should be iteratee series 5 times with promise test', () => {
        let count = 0;
        let length = 5;
        let test = [];
        let iteratee = [];
        return whileSeries(() => {
            return timeout((resolve) => {
                test.push(count);
                resolve(count++ < length);
            });
        }, () => {
            iteratee.push(count);
        }).then(() => {
            expect(count).toBe(6);
            expect(test).toEqual([0, 1, 2, 3, 4, 5]);
            expect(iteratee).toEqual([1, 2, 3, 4, 5]);
        });
    });
});
