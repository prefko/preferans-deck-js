'use strict';

import equalPiles from './equal.piles';
import CONTROL_DECK from './control.deck';

import PrefDeckCard from '../../pref.deck.card';

const isValidDeck = (cards: PrefDeckCard[]): boolean => equalPiles(cards, CONTROL_DECK);
export default isValidDeck;
