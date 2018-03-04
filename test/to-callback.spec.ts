import toCallback from '@promises/to-callback';

describe('toCallback', () => {
    it('should be reject on callback throw error', () => {
        let promise: Promise<string> = Promise.resolve<string>('foo');
        return toCallback(promise, (error: any, result: string) => {
            throw 'reject';
        }).then(() => {
            throw 'resolve';
        }).catch((error: string) => {
            expect(error).toBe('reject');
        });
    });

    it('should be resolve promise from callback return', () => {
        return toCallback<number, number>(0, (error: any, num: number) => {
            return Promise.resolve(++num);
        }).then((num: number) => {
            expect(num).toBe(1);
        });
    });

    it('should be reject promise from callback return', () => {
        return toCallback<number, never>(0, (error: any, num: number) => {
            return Promise.reject(++num);
        }).then(() => {
            throw 'resolve';
        }).catch((num: number) => {
            expect(num).toBe(1);
        });
    });

    it('should be return result to callback', () => {
        let promise: Promise<string> = Promise.resolve<string>('foo');
        return toCallback(promise, (error: any, result: string) => {
            expect(error).toBeNull();
            expect(result).toBe('foo');
        });
    });

    it('should be return error to callback', () => {
        let promise: Promise<string> = Promise.reject<string>('foo');
        return toCallback(promise, (error: string, result: any) => {
            expect(error).toBe('foo');
            expect(result).toBeUndefined();
        });
    });
});
