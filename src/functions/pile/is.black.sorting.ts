'use strict';

import PrefDeckSorting from '../../enums/pref.deck.sorting';

const isBlackSorting = (s: PrefDeckSorting): boolean => s === PrefDeckSorting.BLACK || s === PrefDeckSorting.BLACK_REVERSE;
export default isBlackSorting;
