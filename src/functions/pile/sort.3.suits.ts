'use strict';

import {concat, isEmpty} from 'lodash';

import spreadSuits from './spread.suits';
import getSingleSuit from './get.single.suit';
import isReverseSorting from './is.reverse.sorting';

import PrefDeckCard from '../../pref.deck.card';
import PrefDeckSorting from '../../enums/pref.deck.sorting';

const sort3suits = (cards: PrefDeckCard[], sorting: PrefDeckSorting): PrefDeckCard[] => {
	const reversed: boolean = isReverseSorting(sorting);
	const {spade, diamond, heart, club} = spreadSuits(cards, reversed);

	const black = getSingleSuit(spade, club);
	if (!isEmpty(black)) cards = concat(diamond, black, heart);

	const red = getSingleSuit(diamond, heart);
	if (!isEmpty(red)) cards = concat(spade, red, club);

	return cards;
};
export default sort3suits;
