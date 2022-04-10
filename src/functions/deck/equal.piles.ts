'use strict';

import PrefDeckCard from '../../pref.deck.card';
import pileContainsPile from './pile.contains.pile';

const equalPiles = (a: PrefDeckCard[], b: PrefDeckCard[]): boolean => a.length === b.length && (a === b || (pileContainsPile(a, b) && pileContainsPile(b, a)));
export default equalPiles;
