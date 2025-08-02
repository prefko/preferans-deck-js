'use strict';

const normalize = (n: number): -1 | 0 | 1 => (n === 0 ? 0 : n / Math.abs(n));
export default normalize;
