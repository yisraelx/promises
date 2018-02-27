import toCallback from '@promises/to-callback';

describe('toCallback', () => {
    it('should be return result to callback', () => {
        let promise: any = Promise.resolve<string>('foo');
        return toCallback(promise, (error: any, result: string) => {
            expect(result).toBe('foo');
        });
    });

    it('should be return error to callback', () => {
        let promise: any = Promise.reject<string>('foo');
        return toCallback(promise, (error: any) => {
            expect(error).toBe('foo');
        });
    });
});
