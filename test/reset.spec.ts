import reset from '@promises/reset';

describe('reset', () => {
    it('should be reset resolve promise to new resolve promise', () => {
        let promise = Promise.resolve('foo');
        return reset(promise, 'new val').then((result: string) => {
            expect(result).toBe('new val');
        });
    });

    it('should be reset reject promise to new resolve promise', () => {
        let promise = Promise.reject('foo');
        return reset(promise, 'new val').then((result: string) => {
            expect(result).toBe('new val');
        });
    });
});
