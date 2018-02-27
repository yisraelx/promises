import reset from '@promises/next';

describe('next', () => {
    it('should be return promise resolve with new value', () => {
        let promise = Promise.resolve('foo');
        return reset(promise, 'new val').then((result: string) => {
            expect(result).toBe('new val');
        });
    });
});
