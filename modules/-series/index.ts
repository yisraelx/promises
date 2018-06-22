/**
 * @module @promises/-series
 * @copyright © 2017 Yisrael Eliav <yisraelx@gmail.com> (https://github.com/yisraelx)
 * @license MIT
 */

export { default as doWhileSeries } from '@promises/do-while-series';
export { default as everySeries } from '@promises/every-series';
export { default as filterSeries } from '@promises/filter-series';
export { default as forEachSeries } from '@promises/for-each-series';
export { default as forEachRightSeries } from '@promises/for-each-right-series';
export * from '@promises/interfaces';
export { default as mapSeries } from '@promises/map-series';
export { default as reduceSeries } from '@promises/reduce-series';
export { default as reduceRightSeries } from '@promises/reduce-right-series';
export { default as rejectSeries } from '@promises/reject-series';
export { default as series } from '@promises/series';
export { default as someSeries } from '@promises/some-series';
export { default as timesSeries } from '@promises/times-series';
export { default as whileSeries } from '@promises/while-series';

import './add';
export { default as Promises } from '@promises/core';
