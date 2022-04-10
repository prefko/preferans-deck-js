'use strict';

import PrefDeckSorting from '../../enums/pref.deck.sorting';

const isSuitSorting = (s: PrefDeckSorting): boolean => s === PrefDeckSorting.SUITS || s === PrefDeckSorting.SUITS_REVERSE;
export default isSuitSorting;
