'use strict';

import {concat} from 'lodash';

import spreadSuits from './spread.suits';
import isRedSorting from './is.red.sorting';
import isReverseSorting from './is.reverse.sorting';

import PrefDeckCard from '../../pref.deck.card';
import PrefDeckSorting from '../../enums/pref.deck.sorting';

const sort2suits = (cards: PrefDeckCard[], sorting: PrefDeckSorting): PrefDeckCard[] => {
	const reversed: boolean = isReverseSorting(sorting);
	const {spade, diamond, heart, club} = spreadSuits(cards, reversed);
	const red = concat(diamond, heart);
	const black = concat(spade, club);
	cards = isRedSorting(sorting) ? concat(red, black) : concat(black, red);
	return cards;
};
export default sort2suits;
