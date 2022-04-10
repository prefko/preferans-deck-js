'use strict';

import {find, includes} from 'lodash';

import PrefDeckCard from '../../pref.deck.card';

const pileContainsPile = (p1: PrefDeckCard[], p2: PrefDeckCard[]): boolean => !find(p1, (c) => !includes(p2, c));
export default pileContainsPile;
