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
        let execFinally = false;
        let catchError = false;
        return _finally(promise, () => {
            expect(catchError).toBeFalsy();
            execFinally = true;
        }).then(() => {
            throw 'resolve';
        }).catch((data) => {
            expect(data).toBe('reject');
            expect(execFinally).toBeTruthy();
            catchError = true;
        });
    });

    it('should be reject on throw error', () => {
        return _finally('foo', () => {
            throw 'finally';
        }).then(() => {
            throw 'resolve';
        }).catch((data) => {
            expect(data).toBe('finally');
        });
    });
});
