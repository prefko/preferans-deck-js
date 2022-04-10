'use strict';

import {concat} from 'lodash';

import spreadSuits from './spread.suits';
import PrefDeckCard from '../../pref.deck.card';

const sortBySuits = (cards: PrefDeckCard[], reversed: boolean): PrefDeckCard[] => {
	const {spade, diamond, heart, club} = spreadSuits(cards, reversed);
	cards = concat(spade, diamond, heart, club);
	return cards;
};
export default sortBySuits;
