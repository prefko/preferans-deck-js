'use strict';

import PrefDeckValue from '../../enums/pref.deck.value';

const VALUE_LABELS = {7: '7', 8: '8', 9: '9', 10: 'X', 12: 'J', 13: 'Q', 14: 'K', 15: 'A'};
const getValueLabel = (value: PrefDeckValue): string => VALUE_LABELS[value];
export default getValueLabel;
