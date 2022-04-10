'use strict';

import {filter} from 'lodash';

import PrefDeckCard from '../../pref.deck.card';
import PrefDeckSuit from '../../enums/pref.deck.suit';

const getCardsOfSuit = (cards: PrefDeckCard[], suit: PrefDeckSuit): PrefDeckCard[] => filter(cards, ['suit', suit]);
export default getCardsOfSuit;
