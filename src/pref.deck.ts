'use strict';

import * as _ from 'lodash';

import PrefDeckCard from './pref.deck.card';
import PrefDeckPile from './pref.deck.pile';
import PrefDeckTrick from './pref.deck.trick';

import PrefDeckSuit from './enums/pref.deck.suit';
import PrefDeckValue from './enums/pref.deck.value';
import PrefDeckSorting from './enums/pref.deck.sorting';

import PrefDeckDealType from './types/pref.deck.deal.type';
import PrefDeckTalonType from './types/pref.deck.talon.type';

import isValidDeck from './functions/deck/is.valid.deck';
import randomRange from './functions/deck/random.range';
import weightedRange from './functions/deck/weighted.range';
import humanShuffle from './functions/deck/human.shuffle';
import simpleShuffle from './functions/deck/simple.shuffle';

import CONTROL_DECK from './functions/deck/control.deck';
import WEIGHTED_CUTS from './functions/deck/weighted.cuts';

export {PrefDeckCard, PrefDeckPile, PrefDeckTrick, PrefDeckSuit, PrefDeckValue, PrefDeckSorting, PrefDeckTalonType, PrefDeckDealType};

export default class PrefDeck extends PrefDeckPile {
	constructor() {
		super(CONTROL_DECK);
		return this;
	}

	public restore(cards: PrefDeckCard[]): PrefDeck {
		if (!isValidDeck(cards)) throw new Error('Deck::restore:Invalid cards to restore from: ' + _.size(cards) + ' ' + new PrefDeckPile(cards).unicode);
		this._cards = _.clone(cards);
		return this;
	}

	get cut(): PrefDeck {
		this._cards = this._cards.concat(this._cards.splice(0, _.sample(WEIGHTED_CUTS)));
		return this;
	}

	get shuffle(): PrefDeck {
		_.each(randomRange(), (): PrefDeckCard[] => (this._cards = humanShuffle(this._cards)));
		_.each(weightedRange(), (): PrefDeckCard[] => (this._cards = simpleShuffle(this._cards)));
		return this.cut;
	}

	get valid(): boolean {
		return isValidDeck(this.cards);
	}

	get deal(): PrefDeckDealType {
		const hand1a = _.slice(this._cards, 0, 5);
		const hand2a = _.slice(this._cards, 5, 10);
		const hand3a = _.slice(this._cards, 10, 15);
		const talon = _.slice(this._cards, 15, 17);
		const hand1b = _.slice(this._cards, 17, 22);
		const hand2b = _.slice(this._cards, 22, 27);
		const hand3b = _.slice(this._cards, 27, 32);

		return {
			hand1: new PrefDeckPile(_.concat(hand1a, hand1b)),
			hand2: new PrefDeckPile(_.concat(hand2a, hand2b)),
			hand3: new PrefDeckPile(_.concat(hand3a, hand3b)),
			talon: {talon1: talon[0], talon2: talon[1]}
		};
	}
}
