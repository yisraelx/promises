import keys from '@promises/keys';

describe('keys', () => {
    it('should be return promise with the object keys', () => {
        let object = {foo: 'bar'};
        return keys(object).then((keys: string[]) => {
            expect(keys).toEqual(['foo']);
        });
    });

    it('should be return promise with the array indexes', () => {
        let array: number[] = [0, 1, 2];
        return keys(array).then((keys: string[]) => {
            expect(keys).toEqual(['0', '1', '2']);
        });
    });

    it('should be return promise with the string indexes', () => {
        let word: string = 'foo';
        return keys(word).then((keys: string[]) => {
            expect(keys).toEqual(['0', '1', '2']);
        });
    });
});
