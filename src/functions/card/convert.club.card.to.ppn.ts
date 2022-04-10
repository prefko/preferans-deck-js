'use strict';

import PrefDeckValue from '../../enums/pref.deck.value';

const CLUB_PPNS = {7: 'P', 8: 'Q', 9: 'R', 10: 'S', 12: 'T', 13: 'U', 14: 'V', 15: 'W'};
const convertClubCardToPPN = (value: PrefDeckValue): string => CLUB_PPNS[value];
export default convertClubCardToPPN;
