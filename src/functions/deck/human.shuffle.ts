'use strict';

import {clone, concat, isEmpty, sample} from 'lodash';

import random123 from './random.1.2.3';
import WEIGHTED_CUTS from './weighted.cuts';

import PrefDeckCard from '../../pref.deck.card';

const humanShuffle = (cards: PrefDeckCard[]): PrefDeckCard[] => {
	const left: PrefDeckCard[] = cards.splice(0, sample(WEIGHTED_CUTS));
	const right: PrefDeckCard[] = clone(cards);

	cards = [];
	while (!isEmpty(concat(left, right))) {
		cards = isEmpty(left) ? cards : cards.concat(left.splice(0, random123()));
		cards = isEmpty(right) ? cards : cards.concat(right.splice(0, random123()));
	}
	return cards;
};

export default humanShuffle;
