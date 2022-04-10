'use strict';

import {random} from 'lodash';

const random123 = (): 1 | 2 | 3 => {
	const cnt = random(1, 25);
	return cnt <= 20 ? 1 : cnt <= 24 ? 2 : 3;
};
export default random123;
