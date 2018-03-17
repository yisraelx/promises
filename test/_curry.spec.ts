import _curry from '@promises/_curry';

describe('_curry', () => {
    it(`should be collect 3 args by fn length and take the first arg from last arg`, () => {
        let a = 1;
        let b = 2;
        let c = 3;
        let fn = _curry(function (_1, _2, _3) {
            expect([_1, _2, _3]).toEqual([a, b, c]);
        });

        fn(b, c)(a);
    });

    it(`should be 4 args by fn length and take the first arg from last arg ignore empty`, () => {
        let a = 1;
        let b = 2;
        let d = 4;
        let fn = _curry(function (_1, _2, _3 = 3, _4) {
            expect([_1, _2, _3, _4]).toEqual([a, b, 3, d]);
        });

        fn(b)()(void 0)(d)()(a);
    });

    it(`should be collect 2 args by n and order by array`, () => {
        let a = 1;
        let b = 3;
        let fn = _curry(function (...args) {
            expect(args).toEqual([a, b]);
        }, {length: 2, order: [1, 0]});

        fn(b)(a);
    });

    it(`should be collect 4 args by n and order by array`, () => {
        let a = 1;
        let b = 2;
        let c = 3;
        let d = 4;
        let fn = _curry(function (...args) {
            expect(args).toEqual([a, b, c, d]);
        }, {length: 4, order: [3, 0, 1, 2]});

        fn(b)(c, d)(a);
    });

});
