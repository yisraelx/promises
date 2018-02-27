import Promises from '@promises/core';
import reset from '@promises/reset';

describe('reset', () => {
    it('should be reset resolve promise to new resolve promise', () => {
        let promises = Promises.resolve('foo');
        return reset(promises, 'new val').then((result: string) => {
            expect(result).toBe('new val');
        });
    });

    it('should be reset reject promise to new resolve promise', () => {
        let promises = Promises.reject('foo');
        return reset(promises, 'new val').then((result: string) => {
            expect(result).toBe('new val');
        });
    });
});
