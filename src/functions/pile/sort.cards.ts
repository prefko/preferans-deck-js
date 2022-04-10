'use strict';

import PrefDeckCard from '../../pref.deck.card';
import PrefDeckSorting from '../../enums/pref.deck.sorting';

import countSuits from './count.suits';
import sort2suits from './sort.2.suits';
import sort3suits from './sort.3.suits';
import sort4suits from './sort.4.suits';
import sortBySuits from './sort.by.suits';
import isReverseSorting from './is.reverse.sorting';

const sortCards = (cards: PrefDeckCard[], sorting: PrefDeckSorting): PrefDeckCard[] => {
	const reversed: boolean = isReverseSorting(sorting);
	const suits = countSuits(cards);
	if (suits === 2) return sort2suits(cards, sorting);
	else if (suits === 3) return sort3suits(cards, sorting);
	else if (suits === 4) return sort4suits(cards, sorting);
	else return sortBySuits(cards, reversed);
};
export default sortCards;
