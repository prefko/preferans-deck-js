'use strict';

import PrefDeckValue from '../../enums/pref.deck.value';

const HEART_PPNS = {7: 'H', 8: 'I', 9: 'J', 10: 'K', 12: 'L', 13: 'M', 14: 'N', 15: 'O'};
const convertHeartCardToPPN = (value: PrefDeckValue): string => HEART_PPNS[value];
export default convertHeartCardToPPN;
