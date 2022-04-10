'use strict';

import PrefDeckSorting from '../../enums/pref.deck.sorting';

const isRedSorting = (s: PrefDeckSorting): boolean => s === PrefDeckSorting.RED || s === PrefDeckSorting.RED_REVERSE;
export default isRedSorting;
