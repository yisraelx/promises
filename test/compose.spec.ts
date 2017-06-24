import Promises from '@promises/core';
import compose from '@promises/compose';

describe(`compose`, () => {
    it(`should be compose functions`, () => {
        let prefix = (str: string) => `_${str}`;
        let toUpperCase = (str: string) => String.prototype.toUpperCase.call(str);
        let method = compose(prefix, toUpperCase);
        return method('some').then((result: string) => {
            expect(result).toBe('_SOME');
        });
    });
});