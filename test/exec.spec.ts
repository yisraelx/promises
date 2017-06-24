import Promises from '@promises/core';
import exec from '@promises/exec';

describe('exec', () => {

    it('should be exec function and return promise whit return', () => {
        let foo = () => {
            return 'bar';
        };

        exec(foo).then((result: string) => {
            expect(result).toBe('bar');
        });
    });
});