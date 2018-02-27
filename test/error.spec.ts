import error from '@promises/error';

describe('error', () => {
    it('should be return promise reject', () => {
        let promise = Promise.resolve('foo');
        return error(promise, 'my error').catch((result: string) => {
            expect(result).toBe('my error');
        });
    });
});
