import isPromise from '@promises/is-promise';

describe('isPromise', () => {

    it('should be pormise', () => {
        expect(isPromise(Promise.resolve('foo'))).toBeTruthy();
        expect(isPromise(Promise.reject('foo'))).toBeTruthy();
        expect(isPromise(new Promise(r => r()))).toBeTruthy();
    });

    it('should be not pormise', () => {
        expect(isPromise(null)).toBeFalsy();
        expect(isPromise(777)).toBeFalsy();
        expect(isPromise('foo')).toBeFalsy();
        expect(isPromise(void 0)).toBeFalsy();
        expect(isPromise([])).toBeFalsy();
    });

});
