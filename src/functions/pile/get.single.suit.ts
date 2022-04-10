'use strict';

import {isEmpty} from 'lodash';

import PrefDeckCard from '../../pref.deck.card';

const getSingleSuit = (a: PrefDeckCard[], b: PrefDeckCard[]): PrefDeckCard[] => {
	if (isEmpty(a)) return b;
	if (isEmpty(b)) return a;
	return [];
};
export default getSingleSuit;
