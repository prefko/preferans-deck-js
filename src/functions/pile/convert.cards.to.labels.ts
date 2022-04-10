'use strict';

import {join, map} from 'lodash';

import PrefDeckCard from '../../pref.deck.card';

const convertCardsToLabels = (cards: PrefDeckCard[]): string =>
	join(
		map(cards, (card) => card.label),
		''
	);
export default convertCardsToLabels;
