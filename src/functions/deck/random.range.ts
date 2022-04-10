'use strict';

import {random, range} from 'lodash';

const randomRange = (): number[] => range(0, random(1, 3));
export default randomRange;
