#!/usr/bin/env node
'use strict';

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

const _valueLabel = (value: PrefDeckValue): string => {
	switch (value) {
		case PrefDeckValue.SEVEN:
			return '7';
		case PrefDeckValue.EIGHT:
			return '8';
		case PrefDeckValue.NINE:
			return '9';
		case PrefDeckValue.TEN:
			return 'X';
		case PrefDeckValue.JACK:
			return 'J';
		case PrefDeckValue.QUEEN:
			return 'Q';
		case PrefDeckValue.KING:
			return 'K';
		case PrefDeckValue.ACE:
			return 'A';
	}
};

const _spadeCardToPPN = (value: PrefDeckValue): string => {
	switch (value) {
		case PrefDeckValue.SEVEN:
			return '1';
		case PrefDeckValue.EIGHT:
			return '2';
		case PrefDeckValue.NINE:
			return '3';
		case PrefDeckValue.TEN:
			return '4';
		case PrefDeckValue.JACK:
			return '5';
		case PrefDeckValue.QUEEN:
			return '6';
		case PrefDeckValue.KING:
			return '7';
		case PrefDeckValue.ACE:
			return '8';
	}
};

const _diamondCardToPPN = (value: PrefDeckValue): string => {
	switch (value) {
		case PrefDeckValue.SEVEN:
			return '9';
		case PrefDeckValue.EIGHT:
			return 'A';
		case PrefDeckValue.NINE:
			return 'B';
		case PrefDeckValue.TEN:
			return 'C';
		case PrefDeckValue.JACK:
			return 'D';
		case PrefDeckValue.QUEEN:
			return 'E';
		case PrefDeckValue.KING:
			return 'F';
		case PrefDeckValue.ACE:
			return 'G';
	}
};

const _heartCardToPPN = (value: PrefDeckValue): string => {
	switch (value) {
		case PrefDeckValue.SEVEN:
			return 'H';
		case PrefDeckValue.EIGHT:
			return 'I';
		case PrefDeckValue.NINE:
			return 'J';
		case PrefDeckValue.TEN:
			return 'K';
		case PrefDeckValue.JACK:
			return 'L';
		case PrefDeckValue.QUEEN:
			return 'M';
		case PrefDeckValue.KING:
			return 'N';
		case PrefDeckValue.ACE:
			return 'O';
	}
};

const _clubCardToPPN = (value: PrefDeckValue): string => {
	switch (value) {
		case PrefDeckValue.SEVEN:
			return 'P';
		case PrefDeckValue.EIGHT:
			return 'Q';
		case PrefDeckValue.NINE:
			return 'R';
		case PrefDeckValue.TEN:
			return 'S';
		case PrefDeckValue.JACK:
			return 'T';
		case PrefDeckValue.QUEEN:
			return 'U';
		case PrefDeckValue.KING:
			return 'V';
		case PrefDeckValue.ACE:
			return 'W';
	}
};

const _ppnToCard = (ppn: string): PrefDeckCard => {
	switch (ppn) {
		case '1':
			return new PrefDeckCard(PrefDeckSuit.SPADE, 7);
		case '2':
			return new PrefDeckCard(PrefDeckSuit.SPADE, 8);
		case '3':
			return new PrefDeckCard(PrefDeckSuit.SPADE, 9);
		case '4':
			return new PrefDeckCard(PrefDeckSuit.SPADE, 10);
		case '5':
			return new PrefDeckCard(PrefDeckSuit.SPADE, 12);
		case '6':
			return new PrefDeckCard(PrefDeckSuit.SPADE, 13);
		case '7':
			return new PrefDeckCard(PrefDeckSuit.SPADE, 14);
		case '8':
			return new PrefDeckCard(PrefDeckSuit.SPADE, 15);

		case '9':
			return new PrefDeckCard(PrefDeckSuit.DIAMOND, 7);
		case 'A':
			return new PrefDeckCard(PrefDeckSuit.DIAMOND, 8);
		case 'B':
			return new PrefDeckCard(PrefDeckSuit.DIAMOND, 9);
		case 'C':
			return new PrefDeckCard(PrefDeckSuit.DIAMOND, 10);
		case 'D':
			return new PrefDeckCard(PrefDeckSuit.DIAMOND, 12);
		case 'E':
			return new PrefDeckCard(PrefDeckSuit.DIAMOND, 13);
		case 'F':
			return new PrefDeckCard(PrefDeckSuit.DIAMOND, 14);
		case 'G':
			return new PrefDeckCard(PrefDeckSuit.DIAMOND, 15);

		case 'H':
			return new PrefDeckCard(PrefDeckSuit.HEART, 7);
		case 'I':
			return new PrefDeckCard(PrefDeckSuit.HEART, 8);
		case 'J':
			return new PrefDeckCard(PrefDeckSuit.HEART, 9);
		case 'K':
			return new PrefDeckCard(PrefDeckSuit.HEART, 10);
		case 'L':
			return new PrefDeckCard(PrefDeckSuit.HEART, 12);
		case 'M':
			return new PrefDeckCard(PrefDeckSuit.HEART, 13);
		case 'N':
			return new PrefDeckCard(PrefDeckSuit.HEART, 14);
		case 'O':
			return new PrefDeckCard(PrefDeckSuit.HEART, 15);

		case 'P':
			return new PrefDeckCard(PrefDeckSuit.CLUB, 7);
		case 'Q':
			return new PrefDeckCard(PrefDeckSuit.CLUB, 8);
		case 'R':
			return new PrefDeckCard(PrefDeckSuit.CLUB, 9);
		case 'S':
			return new PrefDeckCard(PrefDeckSuit.CLUB, 10);
		case 'T':
			return new PrefDeckCard(PrefDeckSuit.CLUB, 12);
		case 'U':
			return new PrefDeckCard(PrefDeckSuit.CLUB, 13);
		case 'V':
			return new PrefDeckCard(PrefDeckSuit.CLUB, 14);
		case 'W':
			return new PrefDeckCard(PrefDeckSuit.CLUB, 15);
	}
	throw new Error('PrefDeckCard::ppnToCard:Invalid ppn: ' + ppn);
};

// @ts-ignore
const _norm = (n: number): -1 | 0 | 1 => n === 0 ? 0 : n / Math.abs(n);

export default class PrefDeckCard {

	public static valueLabel(value: PrefDeckValue): string {
		return _valueLabel(value);
	}

	public static compare(c1: PrefDeckCard, c2: PrefDeckCard, t?: PrefDeckSuit): -1 | 0 | 1 {
		if (c1.suit === c2.suit) return _norm(c2.rank - c1.rank);
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
	private readonly _rank: number;
	private readonly _label: string;
	private readonly _unicode: string;
	private readonly _ppn: string;

	constructor(suit: PrefDeckSuit, value: PrefDeckValue) {
		this._suit = suit;
		this._value = value;
		this._rank = value;

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

	get rank(): number {
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
