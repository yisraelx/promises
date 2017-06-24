import Promises from '@promises/core';
import spread from '@promises/spread';

describe('spread', () => {
    it('should be spread the array elements and inject to the function', () => {
        let promise = Promises.resolve([Promises.resolve('foo'), Promises.resolve('bar')]) as Promises<Promises<string>[]>;
        return spread(promise, (a, b) => {
            expect(a).toBe('foo');
            expect(b).toBe('bar');
        });
    });

    it('should be spread the word to letter and inject to the function', () => {
        let promise = Promises.resolve('foo') as Promises<string>;
        return spread(promise, (a, b, c) => {
            expect(a).toBe('f');
            expect(b).toBe('o');
            expect(c).toBe('o');
        });
    });
});