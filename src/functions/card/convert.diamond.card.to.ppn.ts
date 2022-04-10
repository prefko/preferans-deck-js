'use strict';

import PrefDeckValue from '../../enums/pref.deck.value';

const DIAMOND_PPNS = {7: '9', 8: 'A', 9: 'B', 10: 'C', 12: 'D', 13: 'E', 14: 'F', 15: 'G'};
const convertDiamondCardToPPN = (value: PrefDeckValue): string => DIAMOND_PPNS[value];
export default convertDiamondCardToPPN;
