#!/usr/bin/env node
"use strict";

import * as _ from "lodash";
import PrefDeckCard, {PrefDeckCardSuit} from "./prefDeckCard";

export enum PrefDeckPileSorting {
	NONE = 0,
	RED, BLACK, SUITS,
	RED_REVERSE, BLACK_REVERSE, SUITS_REVERSE
}

const isReverseSorting = (sorting: PrefDeckPileSorting): boolean => sorting > PrefDeckPileSorting.SUITS;
const isSuitSorting = (sorting: PrefDeckPileSorting): boolean => sorting === PrefDeckPileSorting.SUITS || sorting === PrefDeckPileSorting.SUITS_REVERSE;
const isRedSorting = (sorting: PrefDeckPileSorting): boolean => sorting === PrefDeckPileSorting.RED || sorting === PrefDeckPileSorting.RED_REVERSE;
const isBlackSorting = (sorting: PrefDeckPileSorting): boolean => sorting === PrefDeckPileSorting.BLACK || sorting === PrefDeckPileSorting.BLACK_REVERSE;

const countSuits = (cards: PrefDeckCard[]): number => _.size(_.uniq(_.map(cards, (card) => card.suit)));

const sortSuit = (cards: PrefDeckCard[], reverse: boolean): PrefDeckCard[] => {
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
const spreadSuits = (cards: PrefDeckCard[], reverse: boolean): PrefDeckPileSuits => {
	return {
		spade: sortSuit(getCardsOfSuit(cards, PrefDeckCardSuit.SPADE), reverse),
		diamond: sortSuit(getCardsOfSuit(cards, PrefDeckCardSuit.DIAMOND), reverse),
		heart: sortSuit(getCardsOfSuit(cards, PrefDeckCardSuit.HEART), reverse),
		club: sortSuit(getCardsOfSuit(cards, PrefDeckCardSuit.CLUB), reverse),
	};
};

const sortBySuits = (cards: PrefDeckCard[], reverse: boolean): PrefDeckCard[] => {
	const {spade, diamond, heart, club} = spreadSuits(cards, reverse);
	cards = _.concat(spade, diamond, heart, club);
	return cards;
};

const sort2suits = (cards: PrefDeckCard[], sorting: PrefDeckPileSorting): PrefDeckCard[] => {
	const {spade, diamond, heart, club} = spreadSuits(cards, isReverseSorting(sorting));
	const red = _.concat(diamond, heart);
	const black = _.concat(spade, club);
	cards = isRedSorting(sorting) ? _.concat(red, black) : _.concat(black, red);
	return cards;
};

const sort3suits = (cards: PrefDeckCard[], sorting: PrefDeckPileSorting): PrefDeckCard[] => {
	const {spade, diamond, heart, club} = spreadSuits(cards, isReverseSorting(sorting));
	const black = getSingleOrNull(spade, club);
	if (black) cards = _.concat(diamond, black, heart);
	const red = getSingleOrNull(diamond, heart);
	if (red) cards = _.concat(spade, red, club);
	return cards;
};

const sort4suits = (cards: PrefDeckCard[], sorting: PrefDeckPileSorting): PrefDeckCard[] => {
	const {spade, diamond, heart, club} = spreadSuits(cards, isReverseSorting(sorting));
	if (isRedSorting(sorting)) cards = _.concat(diamond, spade, heart, club);
	if (isBlackSorting(sorting)) cards = _.concat(spade, diamond, club, heart);
	return cards;
};

const sort = (cards: PrefDeckCard[], sorting: PrefDeckPileSorting): PrefDeckCard[] => {
	const count = countSuits(cards);
	if (count === 2) return sort2suits(cards, sorting);
	else if (count === 3) return sort3suits(cards, sorting);
	else if (count === 4) return sort4suits(cards, sorting);
	else return sortBySuits(cards, isReverseSorting(sorting));
};

const cardsToLabel = (cards: PrefDeckCard[]): string => _.join(_.map(cards, (card) => card.label), "");
const cardsToUnicode = (cards: PrefDeckCard[]): string => _.join(_.map(cards, (card) => card.unicode), "");
const cardsToPPN = (cards: PrefDeckCard[]): string => _.join(_.map(cards, (card) => card.ppn), "");

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

		if (isSuitSorting(sorting)) {
			this._cards = sortBySuits(this._cards, isReverseSorting(sorting));
			return this;
		}

		this._cards = sort(this._cards, sorting);
		return this;
	}

	get cards(): PrefDeckCard[] {
		return this._cards;
	}

	get label(): string {
		return cardsToLabel(this._cards);
	}

	get unicode(): string {
		return cardsToUnicode(this._cards);
	}

	get ppn(): string {
		return cardsToPPN(this._cards);
	}

	get original(): PrefDeckCard[] {
		return this._original;
	}

	get originalLabel(): string {
		return cardsToLabel(this._original);
	}

	get originalUnicode(): string {
		return cardsToUnicode(this._original);
	}

	get originalPPN(): string {
		return cardsToPPN(this._original);
	}

}
