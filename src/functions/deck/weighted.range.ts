'use strict';

import {range} from 'lodash';

import random123 from './random.1.2.3';

const weightedRange = (): number[] => range(0, random123());
export default weightedRange;
