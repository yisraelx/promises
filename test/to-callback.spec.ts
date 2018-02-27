import Promises from '@promises/core';
import toCallback from '@promises/to-callback';

describe('toCallback', () => {
    it('should be return result to callback', () => {
        let promise: any = Promises.resolve<string>('foo');
        return toCallback(promise, (error: any, result: string) => {
            expect(result).toBe('foo');
        });
    });

    it('should be return error to callback', () => {
        let promise: any = Promises.reject<string>('foo');
        return toCallback(promise, (error: any) => {
            expect(error).toBe('foo');
        });
    });
});
