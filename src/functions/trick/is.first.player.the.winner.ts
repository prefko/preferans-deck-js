'use strict';

import PrefDeckCard from '../../pref.deck.card';
import PrefDeckSuit from '../../enums/pref.deck.suit';

const isFirstPlayerTheWinner = (c1: PrefDeckCard, c2: PrefDeckCard, c3?: PrefDeckCard, suit?: PrefDeckSuit): boolean => c1.beats(c2, suit) && (!c3 || c1.beats(c3, suit));
export default isFirstPlayerTheWinner;
