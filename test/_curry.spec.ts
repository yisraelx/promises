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

    it(`should be collect 2 args by length`, () => {
        let a = 1;
        let b = 3;
        let fn = _curry(function (...args) {
            expect(args).toEqual([a, b]);
        }, 2);

        fn(b)(a);
    });

});
