'use strict';

import PrefDeckSuit from './enums/pref.deck.suit';
import PrefDeckValue from './enums/pref.deck.value';

import normalize from './functions/card/normalize';
import getValueLabel from './functions/card/get.value.label';
import convertPPNToCard from './functions/card/convert.ppn.to.card';
import convertClubCardToPPN from './functions/card/convert.club.card.to.ppn';
import convertSpadeCardToPPN from './functions/card/convert.spade.card.to.ppn';
import convertHeartCardToPPN from './functions/card/convert.heart.card.to.ppn';
import convertDiamondCardToPPN from './functions/card/convert.diamond.card.to.ppn';

export default class PrefDeckCard {
	public static valueLabel(value: PrefDeckValue): string {
		return getValueLabel(value);
	}

	public static compare(c1: PrefDeckCard, c2: PrefDeckCard, t?: PrefDeckSuit): -1 | 0 | 1 {
		if (c1.suit === c2.suit) return normalize(c2.value - c1.value);
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
				return convertSpadeCardToPPN(c.value);
			case PrefDeckSuit.DIAMOND:
				return convertDiamondCardToPPN(c.value);
			case PrefDeckSuit.HEART:
				return convertHeartCardToPPN(c.value);
			case PrefDeckSuit.CLUB:
				return convertClubCardToPPN(c.value);
		}
	}

	public static ppnToCard(ppn: string): PrefDeckCard {
		return convertPPNToCard(ppn);
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
