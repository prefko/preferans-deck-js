'use strict';

import PrefDeckSorting from '../../enums/pref.deck.sorting';

const isReverseSorting = (s: PrefDeckSorting): boolean => s > PrefDeckSorting.SUITS;
export default isReverseSorting;
