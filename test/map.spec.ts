import Promises from '@promises/core';
import mapSeries from '@promises/map-series';
import mapParallel from '@promises/map-parallel';

import everySeries from '@promises/every-series';
import { IFn, ITestIteratee } from './interfaces';

export interface ITestMaps extends ITestIteratee {
    equal?: any;
}

let tests: ITestMaps[] = [
    {collection: void 0, iteratee: void 0, equal: []},
    {collection: [], iteratee: void 0, equal: []},
    {collection: {}, iteratee: void 0, equal: {}},
    {collection: [0, 1, 2], iteratee: void 0, equal: [0, 1, 2]},
    {collection: {0: 0, 1: 1}, iteratee: void 0, equal: {0: 0, 1: 1}},
    {collection: [[null], [true, 1]], iteratee: v => everySeries(v), equal: [false, true]},
    {
        collection: {0: 0, 1: 1},
        iteratee: Boolean,
        equal: {0: false, 1: true}
    },
    {
        collection: Promises.resolve([Promises.resolve(0), 1]),
        iteratee: (v) => Promises.resolve(v),
        equal: [0, 1]
    },
];

let fns: IFn[] = [
    {id: 'mapSeries', fn: mapSeries},
    {id: 'mapParallel', fn: mapParallel}
];

function createTest(fns: IFn[], tests: ITestMaps[]) {
    fns.forEach(({id, fn}: IFn) => {
        describe(`${id}`, () => {
            tests.forEach(({collection, iteratee, equal}: ITestMaps) => {

                it(`should be mapped ${JSON.stringify(collection)} with iteratee ${JSON.stringify(iteratee)} to ${JSON.stringify(equal)} `, () => {
                    return fn(collection, iteratee).then((result) => {
                        expect(result).toEqual(equal);
                    });
                });

            });
        });
    });
}

createTest(fns, tests);
