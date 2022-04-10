'use strict';

import PrefDeckValue from '../../enums/pref.deck.value';

const SPADE_PPNS = {7: '1', 8: '2', 9: '3', 10: '4', 12: '5', 13: '6', 14: '7', 15: '8'};
const convertSpadeCardToPPN = (value: PrefDeckValue): string => SPADE_PPNS[value];
export default convertSpadeCardToPPN;
