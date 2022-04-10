'use strict';

import PrefDeckPile from '../pref.deck.pile';
import PrefDeckTalonType from './pref.deck.talon.type';

type PrefDeckDealType = {hand1: PrefDeckPile; hand2: PrefDeckPile; hand3: PrefDeckPile; talon: PrefDeckTalonType};
export default PrefDeckDealType;
