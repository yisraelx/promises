import fromCallback from '@promises/from-callback';

describe('fromCallback', () => {
    it('should be reject on callback error', () => {
        fromCallback((callback) => {
            callback('reject');
        }).then(() => {
            throw 'resolve';
        }).catch((error) => {
            expect(error).toBe('reject');
        });
    });

    it('should be reject on throw error', () => {
        fromCallback((callback) => {
            throw 'error';
        }).then(() => {
            throw 'resolve';
        }).catch((error) => {
            expect(error).toBe('error');
        });
    });


    it('should be resolve one arg', () => {
        fromCallback((callback) => {
            (callback as any)(null, 'a', 'b');
        }).then((result: string) => {
            expect(result).toBe('a');
        });
    });

    it('should be resolve multi args', () => {
        fromCallback((callback) => {
            callback(null, 'a', 'b', 'c');
        }, true).then((result: string[]) => {
            expect(result).toEqual(['a', 'b', 'c']);
        });
    });
});
