'use strict';

import PrefDeckSuit from '../../enums/pref.deck.suit';
import PrefDeckTrump from '../../enums/pref.deck.trump';

const convertTrumpToSuit = (trump: PrefDeckTrump): PrefDeckSuit | undefined => {
	if (!trump) return undefined;
	switch (trump) {
		case PrefDeckTrump.SPADE:
			return PrefDeckSuit.SPADE;
		case PrefDeckTrump.DIAMOND:
			return PrefDeckSuit.DIAMOND;
		case PrefDeckTrump.HEART:
			return PrefDeckSuit.HEART;
		case PrefDeckTrump.CLUB:
			return PrefDeckSuit.CLUB;
	}
};
export default convertTrumpToSuit;
