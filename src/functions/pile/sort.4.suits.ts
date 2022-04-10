'use strict';

import {concat} from 'lodash';

import spreadSuits from './spread.suits';
import isBlackSorting from './is.black.sorting';
import isReverseSorting from './is.reverse.sorting';

import PrefDeckCard from '../../pref.deck.card';
import PrefDeckSorting from '../../enums/pref.deck.sorting';

const sort4suits = (cards: PrefDeckCard[], sorting: PrefDeckSorting): PrefDeckCard[] => {
	const reversed: boolean = isReverseSorting(sorting);
	const {spade, diamond, heart, club} = spreadSuits(cards, reversed);
	if (isBlackSorting(sorting)) return concat(spade, diamond, club, heart);
	return concat(diamond, spade, heart, club);
};
export default sort4suits;
