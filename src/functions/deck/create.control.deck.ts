'use strict';

import {each} from 'lodash';

import PrefDeckCard from '../../pref.deck.card';
import PrefDeckSuit from '../../enums/pref.deck.suit';
import PrefDeckValue from '../../enums/pref.deck.value';

const createControlDeck = (): PrefDeckCard[] => {
	const deck: PrefDeckCard[] = [];
	const suits = [PrefDeckSuit.SPADE, PrefDeckSuit.DIAMOND, PrefDeckSuit.HEART, PrefDeckSuit.CLUB];
	const values = [PrefDeckValue.SEVEN, PrefDeckValue.EIGHT, PrefDeckValue.NINE, PrefDeckValue.TEN, PrefDeckValue.JACK, PrefDeckValue.QUEEN, PrefDeckValue.KING, PrefDeckValue.ACE];

	each(suits, (suit: PrefDeckSuit): void => {
		each(values, (value: PrefDeckValue): void => {
			deck.push(new PrefDeckCard(suit, value));
		});
	});
	return deck;
};
export default createControlDeck;
