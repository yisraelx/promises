import Promises from '@promises/core';
import error from '@promises/error';

describe('error', () => {
    it('should be return promise reject', () => {
        let promises = Promises.resolve('foo');
        return error(promises, 'my error').catch((result: string) => {
            expect(result).toBe('my error');
        });
    });
});
