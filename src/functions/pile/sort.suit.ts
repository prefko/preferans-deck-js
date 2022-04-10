'use strict';

import {reverse, sortBy} from 'lodash';

import PrefDeckCard from '../../pref.deck.card';

const sortSuit = (cards: PrefDeckCard[], reversed: boolean): PrefDeckCard[] => {
	cards = sortBy(cards, ['value']);
	if (reversed) cards = reverse(cards);
	return cards;
};
export default sortSuit;
