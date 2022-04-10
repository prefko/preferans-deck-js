'use strict';

import * as _ from 'lodash';

import PrefDeckCard from './pref.deck.card';
import PrefDeckSorting from './enums/pref.deck.sorting';

import sortCards from './functions/pile/sort.cards';
import sortBySuits from './functions/pile/sort.by.suits';
import isSuitSorting from './functions/pile/is.suit.sorting';
import isReverseSorting from './functions/pile/is.reverse.sorting';
import convertCardsToPPNs from './functions/pile/convert.cards.to.ppns';
import convertCardsToLabels from './functions/pile/convert.cards.to.labels';
import convertCardsToUnicodes from './functions/pile/convert.cards.to.unicodes';

export default class PrefDeckPile {
	protected _cards: PrefDeckCard[];
	private readonly _original: PrefDeckCard[];

	constructor(cards: PrefDeckCard[]) {
		this._cards = [];
		this._original = [];
		_.each(cards, (card: PrefDeckCard): void => {
			this._cards.push(card);
			this._original.push(card);
		});
	}

	public sort(sorting: PrefDeckSorting = PrefDeckSorting.BLACK): PrefDeckPile {
		if (sorting === PrefDeckSorting.NONE) return this;

		if (isSuitSorting(sorting)) {
			const reverse: boolean = isReverseSorting(sorting);
			this._cards = sortBySuits(this._cards, reverse);
			return this;
		}

		this._cards = sortCards(this._cards, sorting);
		return this;
	}

	get cards(): PrefDeckCard[] {
		return this._cards;
	}

	get label(): string {
		return convertCardsToLabels(this._cards);
	}

	get unicode(): string {
		return convertCardsToUnicodes(this._cards);
	}

	get ppn(): string {
		return convertCardsToPPNs(this._cards);
	}

	get original(): PrefDeckCard[] {
		return this._original;
	}

	get originalLabel(): string {
		return convertCardsToLabels(this._original);
	}

	get originalUnicode(): string {
		return convertCardsToUnicodes(this._original);
	}

	get originalPPN(): string {
		return convertCardsToPPNs(this._original);
	}
}
