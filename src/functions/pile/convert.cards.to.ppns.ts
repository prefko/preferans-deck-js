'use strict';

import {join, map} from 'lodash';

import PrefDeckCard from '../../pref.deck.card';

const convertCardsToPPNs = (cards: PrefDeckCard[]): string =>
	join(
		map(cards, (card) => card.ppn),
		''
	);
export default convertCardsToPPNs;
