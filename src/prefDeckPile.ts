#!/usr/bin/env node
"use strict";

import * as _ from "lodash";
import PrefDeckCard, {PrefDeckCardSuit} from "./prefDeckCard";

export enum PrefDeckPileSorting {NONE = 1, RED, BLACK, SUITS, RED_REVERSE, BLACK_REVERSE, SUITS_REVERSE}

const isReverseSorting = (sorting: PrefDeckPileSorting): boolean => sorting > PrefDeckPileSorting.SUITS;
const isSuitSorting = (sorting: PrefDeckPileSorting): boolean => sorting === PrefDeckPileSorting.SUITS || sorting === PrefDeckPileSorting.SUITS_REVERSE;
const isRedSorting = (sorting: PrefDeckPileSorting): boolean => sorting === PrefDeckPileSorting.RED || sorting === PrefDeckPileSorting.RED_REVERSE;
const isBlackSorting = (sorting: PrefDeckPileSorting): boolean => sorting === PrefDeckPileSorting.BLACK || sorting === PrefDeckPileSorting.BLACK_REVERSE;

const countSuits = (cards: PrefDeckCard[]): number => _.size(_.uniq(_.map(cards, (card) => card.suit)));

const sortSuit = (cards: PrefDeckCard[], reverse: boolean = false): PrefDeckCard[] => {
	cards = _.sortBy(cards, ["rank"]);
	if (true === reverse) cards = _.reverse(cards);
	return cards;
};
const getCardsOfSuit = (cards: PrefDeckCard[], suit: PrefDeckCardSuit): PrefDeckCard[] => _.filter(cards, ["suit", suit]);

const getSingleOrNull = (a: PrefDeckCard[], b: PrefDeckCard[]): PrefDeckCard[] | null => {
	if (_.isEmpty(a)) return b;
	if (_.isEmpty(b)) return a;
	return null;
};
export type PrefDeckPileSuits = { spade: PrefDeckCard[], diamond: PrefDeckCard[], heart: PrefDeckCard[], club: PrefDeckCard[] }
const spreadSuits = (cards: PrefDeckCard[], reverse: boolean = false): PrefDeckPileSuits => {
	return {
		spade: sortSuit(getCardsOfSuit(cards, PrefDeckCardSuit.SPADE), reverse),
		diamond: sortSuit(getCardsOfSuit(cards, PrefDeckCardSuit.DIAMOND), reverse),
		heart: sortSuit(getCardsOfSuit(cards, PrefDeckCardSuit.HEART), reverse),
		club: sortSuit(getCardsOfSuit(cards, PrefDeckCardSuit.CLUB), reverse)
	};
};

const sortSuits = (cards: PrefDeckCard[], reverse: boolean = false): PrefDeckCard[] => {
	const {spade, diamond, heart, club} = spreadSuits(cards, reverse);
	cards = _.concat(spade, diamond, heart, club);
	return cards;
};

const _sort2 = (cards: PrefDeckCard[], sorting: PrefDeckPileSorting): PrefDeckCard[] => {
	const {spade, diamond, heart, club} = spreadSuits(cards, isReverseSorting(sorting));
	const red = _.concat(diamond, heart);
	const black = _.concat(spade, club);
	cards = isRedSorting(sorting) ? _.concat(red, black) : _.concat(black, red);
	return cards;
};

const _sort3 = (cards: PrefDeckCard[]): PrefDeckCard[] => {
	const {spade, diamond, heart, club} = spreadSuits(cards);
	const black = getSingleOrNull(spade, club);
	if (black) cards = _.concat(diamond, black, heart);
	let red = getSingleOrNull(diamond, heart);
	if (red) cards = _.concat(spade, red, club);
	return cards;
};

const _sort4 = (cards: PrefDeckCard[], sorting: PrefDeckPileSorting): PrefDeckCard[] => {
	const {spade, diamond, heart, club} = spreadSuits(cards, isReverseSorting(sorting));
	if (isRedSorting(sorting)) cards = _.concat(diamond, spade, heart, club);
	if (isBlackSorting(sorting)) cards = _.concat(spade, diamond, club, heart);
	return cards;
};

const sort = (cards: PrefDeckCard[], sorting: PrefDeckPileSorting): PrefDeckCard[] => {
	const count = countSuits(cards);
	if (count === 2) return _sort2(cards, sorting);
	if (count === 3) return _sort3(cards);
	if (count === 4) return _sort4(cards, sorting);
	return cards;
};

export default class PrefDeckPile {
	protected _cards: PrefDeckCard[];
	private readonly _original: PrefDeckCard[];

	constructor(cards: PrefDeckCard[]) {
		this._cards = [];
		this._original = [];
		_.forEach(cards, (card) => {
			this._cards.push(card);
			this._original.push(card);
		});
	}

	public sort(sorting: PrefDeckPileSorting = PrefDeckPileSorting.BLACK): PrefDeckPile {
		if (sorting === PrefDeckPileSorting.NONE) return this;

		this._cards = sortSuits(this._cards, isReverseSorting(sorting));
		if (isSuitSorting(sorting)) return this;

		this._cards = sort(this._cards, sorting);
		return this;
	}

	get cards(): PrefDeckCard[] {
		return this._cards;
	}

	get ppn(): string {
		return _.join(_.map(this._cards, (card) => card.ppn), "");
	}

	get original(): PrefDeckCard[] {
		return this._original;
	}

	get ppnOriginal(): string {
		return _.join(_.map(this._original, (card) => card.ppn), "");
	}

}
