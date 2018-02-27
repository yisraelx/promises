import keys from '@promises/_keys';

let tests = [
    {object: 1, result: []},
    {object: true, result: []},
    {object: null, result: []},
    {object: void 0, result: []},
    {object: [], result: []},
    {object: {}, result: []},
    {object: [1, 2, 3], result: ['0', '1', '2']},
    {object: {a: 1, b: 2, c: 3}, result: ['a', 'b', 'c']}
];

describe('_keys', () => {
    describe('should be return keys with native Object.key ', () => {
        createTest(tests);
    });

    describe('should be return keys without native Object.key ', () => {
        let nativeKeys = Object.keys;
        Object.keys = void 0;
        createTest(tests);
        Object.keys = nativeKeys;
    });
});

function createTest(tests) {
    tests.forEach(({object, result}) => {
        let objectKeys = keys(object);
        describe('', () => {
            it(`should be get ${JSON.stringify(object)} and return ${JSON.stringify(objectKeys)}`, () => {
                expect(objectKeys).toEqual(result);
            });
        });
    });
}
