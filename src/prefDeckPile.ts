#!/usr/bin/env node
'use strict';

import * as _ from 'lodash';
import PrefDeckCard, { PrefDeckCardSuit } from './prefDeckCard';

export enum PrefDeckPileSorting {
	NONE = 0,
	RED, BLACK, SUITS,
	RED_REVERSE, BLACK_REVERSE, SUITS_REVERSE
}

const _isReverseSorting = (sorting: PrefDeckPileSorting): boolean => sorting > PrefDeckPileSorting.SUITS;
const _isSuitSorting = (sorting: PrefDeckPileSorting): boolean => sorting === PrefDeckPileSorting.SUITS || sorting === PrefDeckPileSorting.SUITS_REVERSE;
const _isRedSorting = (sorting: PrefDeckPileSorting): boolean => sorting === PrefDeckPileSorting.RED || sorting === PrefDeckPileSorting.RED_REVERSE;
const _isBlackSorting = (sorting: PrefDeckPileSorting): boolean => sorting === PrefDeckPileSorting.BLACK || sorting === PrefDeckPileSorting.BLACK_REVERSE;

const _countSuits = (cards: PrefDeckCard[]): number => _.size(_.uniq(_.map(cards, (card) => card.suit)));

const _sortSuit = (cards: PrefDeckCard[], reverse: boolean): PrefDeckCard[] => {
	cards = _.sortBy(cards, ['rank']);
	if (reverse) cards = _.reverse(cards);
	return cards;
};
const _getCardsOfSuit = (cards: PrefDeckCard[], suit: PrefDeckCardSuit): PrefDeckCard[] => _.filter(cards, ['suit', suit]);

const _getSingleSuit = (a: PrefDeckCard[], b: PrefDeckCard[]): PrefDeckCard[] => {
	if (_.isEmpty(a)) return b;
	if (_.isEmpty(b)) return a;
	return [];
};

export type PrefDeckPileSuits = { spade: PrefDeckCard[], diamond: PrefDeckCard[], heart: PrefDeckCard[], club: PrefDeckCard[] }
const _spreadSuits = (cards: PrefDeckCard[], reverse: boolean): PrefDeckPileSuits => ({
	spade: _sortSuit(_getCardsOfSuit(cards, PrefDeckCardSuit.SPADE), reverse),
	diamond: _sortSuit(_getCardsOfSuit(cards, PrefDeckCardSuit.DIAMOND), reverse),
	heart: _sortSuit(_getCardsOfSuit(cards, PrefDeckCardSuit.HEART), reverse),
	club: _sortSuit(_getCardsOfSuit(cards, PrefDeckCardSuit.CLUB), reverse),
});

const _sortBySuits = (cards: PrefDeckCard[], reverse: boolean): PrefDeckCard[] => {
	const { spade, diamond, heart, club } = _spreadSuits(cards, reverse);
	cards = _.concat(spade, diamond, heart, club);
	return cards;
};

const _sort2suits = (cards: PrefDeckCard[], sorting: PrefDeckPileSorting): PrefDeckCard[] => {
	const reverse: boolean = _isReverseSorting(sorting);
	const { spade, diamond, heart, club } = _spreadSuits(cards, reverse);
	const red = _.concat(diamond, heart);
	const black = _.concat(spade, club);
	cards = _isRedSorting(sorting) ? _.concat(red, black) : _.concat(black, red);
	return cards;
};

const _sort3suits = (cards: PrefDeckCard[], sorting: PrefDeckPileSorting): PrefDeckCard[] => {
	const reverse: boolean = _isReverseSorting(sorting);
	const { spade, diamond, heart, club } = _spreadSuits(cards, reverse);

	const black = _getSingleSuit(spade, club);
	if (!_.isEmpty(black)) cards = _.concat(diamond, black, heart);

	const red = _getSingleSuit(diamond, heart);
	if (!_.isEmpty(red)) cards = _.concat(spade, red, club);

	return cards;
};

const _sort4suits = (cards: PrefDeckCard[], sorting: PrefDeckPileSorting): PrefDeckCard[] => {
	const reverse: boolean = _isReverseSorting(sorting);
	const { spade, diamond, heart, club } = _spreadSuits(cards, reverse);
	if (_isBlackSorting(sorting)) return _.concat(spade, diamond, club, heart);
	return _.concat(diamond, spade, heart, club);
};

const _sort = (cards: PrefDeckCard[], sorting: PrefDeckPileSorting): PrefDeckCard[] => {
	const reverse: boolean = _isReverseSorting(sorting);
	const suits = _countSuits(cards);
	if (suits === 2) return _sort2suits(cards, sorting);
	else if (suits === 3) return _sort3suits(cards, sorting);
	else if (suits === 4) return _sort4suits(cards, sorting);
	else return _sortBySuits(cards, reverse);
};

const _cardsToLabel = (cards: PrefDeckCard[]): string => _.join(_.map(cards, (card) => card.label), '');
const _cardsToUnicode = (cards: PrefDeckCard[]): string => _.join(_.map(cards, (card) => card.unicode), '');
const _cardsToPPN = (cards: PrefDeckCard[]): string => _.join(_.map(cards, (card) => card.ppn), '');

export default class PrefDeckPile {
	protected _cards: PrefDeckCard[];
	private readonly _original: PrefDeckCard[];

	constructor(cards: PrefDeckCard[]) {
		this._cards = [];
		this._original = [];
		_.forEach(cards, (card: PrefDeckCard): void => {
			this._cards.push(card);
			this._original.push(card);
		});
	}

	public sort(sorting: PrefDeckPileSorting = PrefDeckPileSorting.BLACK): PrefDeckPile {
		if (sorting === PrefDeckPileSorting.NONE) return this;

		if (_isSuitSorting(sorting)) {
			const reverse: boolean = _isReverseSorting(sorting);
			this._cards = _sortBySuits(this._cards, reverse);
			return this;
		}

		this._cards = _sort(this._cards, sorting);
		return this;
	}

	get cards(): PrefDeckCard[] {
		return this._cards;
	}

	get label(): string {
		return _cardsToLabel(this._cards);
	}

	get unicode(): string {
		return _cardsToUnicode(this._cards);
	}

	get ppn(): string {
		return _cardsToPPN(this._cards);
	}

	get original(): PrefDeckCard[] {
		return this._original;
	}

	get originalLabel(): string {
		return _cardsToLabel(this._original);
	}

	get originalUnicode(): string {
		return _cardsToUnicode(this._original);
	}

	get originalPPN(): string {
		return _cardsToPPN(this._original);
	}

}
