#!/usr/bin/env node
'use strict';

import {get} from 'lodash';

export enum PrefDeckValue {
	SEVEN = 7, EIGHT = 8, NINE = 9, TEN = 10,
	JACK = 12, QUEEN = 13, KING = 14, ACE = 15
}

export enum PrefDeckSuit {
	SPADE = 'Spade',
	DIAMOND = 'Diamond',
	HEART = 'Heart',
	CLUB = 'Club'
}

const _valueLabels = {7: '7', 8: '8', 9: '9', 10: 'X', 12: 'J', 13: 'Q', 14: 'K', 15: 'A'};
const _valueLabel = (value: PrefDeckValue): string => _valueLabels[value];

const _spadePPNs = {7: '1', 8: '2', 9: '3', 10: '4', 12: '5', 13: '6', 14: '7', 15: '8'};
const _spadeCardToPPN = (value: PrefDeckValue): string => _spadePPNs[value];

const _diamondPPNs = {7: '9', 8: 'A', 9: 'B', 10: 'C', 12: 'D', 13: 'E', 14: 'F', 15: 'G'};
const _diamondCardToPPN = (value: PrefDeckValue): string => _diamondPPNs[value];

const _heartPPNs = {7: 'H', 8: 'I', 9: 'J', 10: 'K', 12: 'L', 13: 'M', 14: 'N', 15: 'O'};
const _heartCardToPPN = (value: PrefDeckValue): string => _heartPPNs[value];

const _clubPPNs = {7: 'P', 8: 'Q', 9: 'R', 10: 'S', 12: 'T', 13: 'U', 14: 'V', 15: 'W'};
const _clubCardToPPN = (value: PrefDeckValue): string => _clubPPNs[value];

const _ppnCards = {
	'1': {suit: PrefDeckSuit.SPADE, value: 7}, '2': {suit: PrefDeckSuit.SPADE, value: 8},
	'3': {suit: PrefDeckSuit.SPADE, value: 9}, '4': {suit: PrefDeckSuit.SPADE, value: 10},
	'5': {suit: PrefDeckSuit.SPADE, value: 12}, '6': {suit: PrefDeckSuit.SPADE, value: 13},
	'7': {suit: PrefDeckSuit.SPADE, value: 14}, '8': {suit: PrefDeckSuit.SPADE, value: 15},

	'9': {suit: PrefDeckSuit.DIAMOND, value: 7}, 'A': {suit: PrefDeckSuit.DIAMOND, value: 8},
	'B': {suit: PrefDeckSuit.DIAMOND, value: 9}, 'C': {suit: PrefDeckSuit.DIAMOND, value: 10},
	'D': {suit: PrefDeckSuit.DIAMOND, value: 12}, 'E': {suit: PrefDeckSuit.DIAMOND, value: 13},
	'F': {suit: PrefDeckSuit.DIAMOND, value: 14}, 'G': {suit: PrefDeckSuit.DIAMOND, value: 15},

	'H': {suit: PrefDeckSuit.HEART, value: 7}, 'I': {suit: PrefDeckSuit.HEART, value: 8},
	'J': {suit: PrefDeckSuit.HEART, value: 9}, 'K': {suit: PrefDeckSuit.HEART, value: 10},
	'L': {suit: PrefDeckSuit.HEART, value: 12}, 'M': {suit: PrefDeckSuit.HEART, value: 13},
	'N': {suit: PrefDeckSuit.HEART, value: 14}, 'O': {suit: PrefDeckSuit.HEART, value: 15},

	'P': {suit: PrefDeckSuit.CLUB, value: 7}, 'Q': {suit: PrefDeckSuit.CLUB, value: 8},
	'R': {suit: PrefDeckSuit.CLUB, value: 9}, 'S': {suit: PrefDeckSuit.CLUB, value: 10},
	'T': {suit: PrefDeckSuit.CLUB, value: 12}, 'U': {suit: PrefDeckSuit.CLUB, value: 13},
	'V': {suit: PrefDeckSuit.CLUB, value: 14}, 'W': {suit: PrefDeckSuit.CLUB, value: 15},
};

const _ppnToCard = (ppn: string): PrefDeckCard => {
	const card: { suit: PrefDeckSuit, value: number } = get(_ppnCards, ppn, null);
	if (card) return new PrefDeckCard(card.suit, card.value);
	throw new Error('PrefDeckCard::ppnToCard:Invalid ppn: ' + ppn);
};

// @ts-ignore
const _norm = (n: number): -1 | 0 | 1 => n === 0 ? 0 : n / Math.abs(n);

export default class PrefDeckCard {

	public static valueLabel(value: PrefDeckValue): string {
		return _valueLabel(value);
	}

	public static compare(c1: PrefDeckCard, c2: PrefDeckCard, t?: PrefDeckSuit): -1 | 0 | 1 {
		if (c1.suit === c2.suit) return _norm(c2.value - c1.value);
		if (t && c2.suit === t) return 1;
		return -1;
	}

	public static winner(c1: PrefDeckCard, c2: PrefDeckCard, t?: PrefDeckSuit): PrefDeckCard {
		return PrefDeckCard.compare(c1, c2, t) < 0 ? c1 : c2;
	}

	public static suitToUnicode(suit: PrefDeckSuit): string {
		switch (suit) {
			case PrefDeckSuit.SPADE:
				return '♠';
			case PrefDeckSuit.DIAMOND:
				return '♦';
			case PrefDeckSuit.HEART:
				return '♥';
			case PrefDeckSuit.CLUB:
				return '♣';
		}
	}

	public static cardToPPN(c: PrefDeckCard): string {
		switch (c.suit) {
			case PrefDeckSuit.SPADE:
				return _spadeCardToPPN(c.value);
			case PrefDeckSuit.DIAMOND:
				return _diamondCardToPPN(c.value);
			case PrefDeckSuit.HEART:
				return _heartCardToPPN(c.value);
			case PrefDeckSuit.CLUB:
				return _clubCardToPPN(c.value);
		}
	}

	public static ppnToCard(ppn: string): PrefDeckCard {
		return _ppnToCard(ppn);
	}

	private readonly _suit: PrefDeckSuit;
	private readonly _value: PrefDeckValue;
	private readonly _label: string;
	private readonly _unicode: string;
	private readonly _ppn: string;

	constructor(suit: PrefDeckSuit, value: PrefDeckValue) {
		this._suit = suit;
		this._value = value;

		this._label = PrefDeckCard.valueLabel(this._value) + '' + this._suit;
		this._unicode = PrefDeckCard.valueLabel(this._value) + '' + PrefDeckCard.suitToUnicode(this._suit);
		this._ppn = PrefDeckCard.cardToPPN(this);
	}

	public beats(c: PrefDeckCard, t?: PrefDeckSuit): boolean {
		return PrefDeckCard.compare(this, c, t) < 0;
	}

	get suit(): PrefDeckSuit {
		return this._suit;
	}

	get value(): number {
		return this._value;
	}

	get label(): string {
		return this._label;
	}

	get unicode(): string {
		return this._unicode;
	}

	get ppn(): string {
		return this._ppn;
	}

}
