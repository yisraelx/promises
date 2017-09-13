import Promises from '@promises/core';
import _finally from '@promises/finally';

describe('finally', () => {
    it('should be exec after promise resolve and return the data', () => {
        let promise = Promises.resolve('resolve');
        let pass = false;
        return _finally(promise, () => {
            pass = true;
        }).then((data) => {
            expect(data).toBe('resolve');
            expect(pass).toBeTruthy();
        });
    });

    it('should be exec after promise reject and return the data', () => {
        let promise = Promises.reject('reject');
        let pass = false;
        return _finally(promise, () => {
            pass = true;
        }).catch((data) => {
            expect(data).toBe('reject');
            expect(pass).toBeTruthy();
        });
    });
});