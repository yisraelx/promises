import create from '@promises/create';

describe('create', () => {
    it('should be create promises and resolve', () => {
        create((resolve) => resolve('foo')).then((result: string) => {
            expect(result).toBe('foo');
        });
    });

    it('should be create empty promises', () => {
        create().then((result: undefined) => {
            expect(result).toBeUndefined();
        });
    });
});
