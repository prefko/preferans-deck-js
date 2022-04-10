'use strict';

import {concat, map, sortBy} from 'lodash';

const createWeightedCuts = (): number[] => {
	let i, j;
	const cuts = [2, 3];
	for (i = 0; i < 2; i++) for (j = 4; j <= 6; j++) cuts.push(j);
	for (i = 0; i < 5; i++) for (j = 7; j <= 10; j++) cuts.push(j);
	for (i = 0; i < 8; i++) for (j = 11; j <= 15; j++) cuts.push(j);
	return sortBy(
		concat(
			cuts,
			map(cuts, (t: number): number => 31 - t)
		)
	);
};
export default createWeightedCuts;
