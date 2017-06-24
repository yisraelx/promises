import Promises from '@promises/core';
import reset from '@promises/reset';

describe('reset', () => {
    it('should be return promise resolve with new value', () => {
        let promises = Promises.resolve('foo');
        return reset(promises, 'new val').then((result: string) => {
            expect(result).toBe('new val');
        });
    });
});