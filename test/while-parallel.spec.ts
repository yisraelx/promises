import whileParallel from '@promises/while-parallel';
import timeout from '@promises/timeout';

describe('whileParallel', () => {

    it('should be not iteratee if test not pass', () => {
        let test = 0;
        let iteratee = 0;
        return whileParallel(() => {
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
        return whileParallel(() => {
            return index++ < 5;
        }).then(() => {
            expect(index).toBe(6);
        });
    });

    it('should be reject on test error', () => {
        return whileParallel(() => {
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
        return whileParallel(() => {
            return stop = !stop;
        }, () => {
            throw 'iteratee';
        }).then(() => {
            throw 'resolve';
        }).catch((error) => {
            expect(error).toBe('iteratee');
        });
    });

    it('should be iteratee parallel 5 times', () => {
        let index = 0;
        let length = 5;
        let test = [];
        let iteratee = [];
        return whileParallel(() => {
            test.push(index);
            return index++ < length;
        }, () => {
            iteratee.push(index);
        }).then(() => {
            expect(index).toBe(6);
            expect(test).toEqual([0, 1, 2, 3, 4, 5]);
            expect(iteratee).toEqual([1, 2, 3, 4, 5]);
        });
    });

    it('should be iteratee parallel 5 times with promise iteratee', () => {
        let index = 0;
        let test = [];
        let iteratee = [];
        return whileParallel(() => {
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
            expect(iteratee).toEqual([5, 4, 3, 2, 1]);
        });
    });

    it('should be iteratee parallel limit 5 times with promise test', () => {
        let index = 0;
        let test = [];
        let iteratee = [];
        return whileParallel(() => {
            return timeout((resolve) => {
                test.push(index);
                resolve(index++ < 5);
            });
        }, () => {
            iteratee.push(index);
        }, 5).then(() => {
            expect(index).toBe(6);
            expect(test).toEqual([0, 1, 2, 3, 4, 5]);
            expect(iteratee).toEqual([1, 2, 3, 4, 5]);
        });
    });

    it('should be iteratee series 5 times', () => {
        let count = 0;
        let length = 5;
        let test = [];
        let iteratee = [];
        return whileParallel(() => {
            test.push(count);
            return count++ < length;
        }, () => {
            iteratee.push(count);
        }, 1).then(() => {
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
        return whileParallel(() => {
            test.push(count);
            return count++ < length;
        }, () => {
            return timeout((resolve) => {
                iteratee.push(count);
                resolve();
            }, length - count);
        }, 1).then(() => {
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
        return whileParallel(() => {
            return timeout((resolve) => {
                test.push(count);
                resolve(count++ < length);
            });
        }, () => {
            iteratee.push(count);
        }, 1).then(() => {
            expect(count).toBe(6);
            expect(test).toEqual([0, 1, 2, 3, 4, 5]);
            expect(iteratee).toEqual([1, 2, 3, 4, 5]);
        });
    });
});
