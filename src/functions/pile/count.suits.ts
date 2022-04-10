'use strict';

import {map, size, uniq} from 'lodash';

import PrefDeckCard from '../../pref.deck.card';

const countSuits = (cards: PrefDeckCard[]): number => size(uniq(map(cards, (c) => c.suit)));
export default countSuits;
