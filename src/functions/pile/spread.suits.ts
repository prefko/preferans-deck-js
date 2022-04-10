'use strict';

import sortSuit from './sort.suit';
import getCardsOfSuit from './get.cards.of.suit';

import PrefDeckCard from '../../pref.deck.card';
import PrefDeckSuit from '../../enums/pref.deck.suit';
import PrefDeckPileSuitsType from '../../types/pref.deck.pile.suits.type';

const spreadSuits = (cards: PrefDeckCard[], reversed: boolean): PrefDeckPileSuitsType => ({
	spade: sortSuit(getCardsOfSuit(cards, PrefDeckSuit.SPADE), reversed),
	diamond: sortSuit(getCardsOfSuit(cards, PrefDeckSuit.DIAMOND), reversed),
	heart: sortSuit(getCardsOfSuit(cards, PrefDeckSuit.HEART), reversed),
	club: sortSuit(getCardsOfSuit(cards, PrefDeckSuit.CLUB), reversed)
});
export default spreadSuits;
