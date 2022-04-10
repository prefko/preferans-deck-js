'use strict';

import {join, map} from 'lodash';

import PrefDeckCard from '../../pref.deck.card';

const convertCardsToUnicodes = (cards: PrefDeckCard[]): string =>
	join(
		map(cards, (card) => card.unicode),
		''
	);
export default convertCardsToUnicodes;
