import keys from '@promises/keys';

describe('keys', () => {
    it('should be return promise with keys', () => {
        let object = { foo: 'bar' };
        return keys(object).then((keys: string[]) => {
            expect(keys).toEqual(['foo']);
        });
    });

    it('should be return keys to exec function', () => {
        let object = { foo: 'bar' };
        return keys(object, (keys: string[]) => {
            expect(keys).toEqual(['foo']);
        });
    });
});
