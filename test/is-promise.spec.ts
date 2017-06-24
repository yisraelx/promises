import Promises from '@promises/core';

describe('isPromise', () => {

    it('should be pormise', () => {
        expect(Promises.isPromise(Promises.resolve('foo'))).toBeTruthy();
        expect(Promises.isPromise(Promises.reject('foo'))).toBeTruthy();
        expect(Promises.isPromise(new Promises(r => r()))).toBeTruthy();
    });

    it('should be not pormise', () => {
        expect(Promises.isPromise(null)).toBeFalsy();
        expect(Promises.isPromise(777)).toBeFalsy();
        expect(Promises.isPromise('foo')).toBeFalsy();
        expect(Promises.isPromise(void 0)).toBeFalsy();
        expect(Promises.isPromise([])).toBeFalsy();
    });

});
