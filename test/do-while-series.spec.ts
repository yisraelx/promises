import doWhileSeries from '@promises/do-while-series';
import timeout from '@promises/timeout';

describe('doWhileSeries', () => {

    it('should be iteratee once if test not pass', () => {
        let test = 0;
        let iteratee = 0;
        return doWhileSeries(() => {
            test++;
            return false;
        }, () => {
            iteratee++;
        }).then(() => {
            expect(test).toBe(1);
            expect(iteratee).toBe(1);
        });
    });

    it('should be iteratee without iteratee function', () => {
        let index = 0;
        return doWhileSeries(() => {
            return index++ < 5;
        }).then(() => {
            expect(index).toBe(6);
        });
    });

    it('should be reject on test error', () => {
        return doWhileSeries(() => {
            throw 'test';
        }).then(() => {
            throw 'resolve';
        }).catch((error) => {
            expect(error).toBe('test');
        });
    });

    it('should be reject on iteratee error', () => {
        return doWhileSeries(() => {
            throw 'test';
        }, () => {
            throw 'iteratee';
        }).then(() => {
            throw 'resolve';
        }).catch((error) => {
            expect(error).toBe('iteratee');
        });
    });

    it('should be iteratee series 6 times', () => {
        let index = 0;
        let length = 5;
        let test = [];
        let iteratee = [];
        return doWhileSeries(() => {
            test.push(index);
            return index++ < length;
        }, () => {
            iteratee.push(index);
        }).then(() => {
            expect(index).toBe(6);
            expect(test).toEqual([0, 1, 2, 3, 4, 5]);
            expect(iteratee).toEqual([0, 1, 2, 3, 4, 5]);
        });
    });

    it('should be iteratee series 6 times with promise iteratee', () => {
        let index = 0;
        let test = [];
        let iteratee = [];
        return doWhileSeries(() => {
            test.push(index);
            return index++ < 5;
        }, () => {
            let thisIndex = index;
            return timeout((resolve) => {
                iteratee.push(thisIndex);
                resolve();
            }, 6 - index);
        }).then(() => {
            expect(index).toBe(6);
            expect(test).toEqual([0, 1, 2, 3, 4, 5]);
            expect(iteratee).toEqual([0, 1, 2, 3, 4, 5]);
        });
    });

    it('should be iteratee series 6 times with promise test', () => {
        let index = 0;
        let test = [];
        let iteratee = [];
        return doWhileSeries(() => {
            return timeout((resolve) => {
                test.push(index);
                resolve(index++ < 5);
            });
        }, () => {
            iteratee.push(index);
        }).then(() => {
            expect(index).toBe(6);
            expect(test).toEqual([0, 1, 2, 3, 4, 5]);
            expect(iteratee).toEqual([0, 1, 2, 3, 4, 5]);
        });
    });
});
