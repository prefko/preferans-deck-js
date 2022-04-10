'use strict';

import {clone, isEmpty, min, random, size} from 'lodash';

import PrefDeckCard from '../../pref.deck.card';

const simpleShuffle = (cards: PrefDeckCard[]): PrefDeckCard[] => {
	const left: PrefDeckCard[] = cards.splice(0, random(1, 9));
	const right: PrefDeckCard[] = clone(cards);
	let front = true;

	cards = left;
	while (!isEmpty(right)) {
		const cut = min([random(1, 9), size(right)]);
		const swap1 = right.splice(0, cut);

		cards = front ? swap1.concat(cards) : cards.concat(swap1);
		front = !front;
	}
	return cards;
};
export default simpleShuffle;
