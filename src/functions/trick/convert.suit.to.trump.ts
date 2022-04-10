'use strict';

import PrefDeckSuit from '../../enums/pref.deck.suit';
import PrefDeckTrump from '../../enums/pref.deck.trump';

const convertSuitToTrump = (suit: PrefDeckSuit): PrefDeckTrump => {
	switch (suit) {
		case PrefDeckSuit.SPADE:
			return PrefDeckTrump.SPADE;
		case PrefDeckSuit.DIAMOND:
			return PrefDeckTrump.DIAMOND;
		case PrefDeckSuit.HEART:
			return PrefDeckTrump.HEART;
		case PrefDeckSuit.CLUB:
			return PrefDeckTrump.CLUB;
	}
};
export default convertSuitToTrump;
