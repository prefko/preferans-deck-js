#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const Suit = require("./help/suit");
const Value = require("./help/value");
const Rank = require("./help/rank");
const PPN = require("./help/ppn");

class Card {
	constructor(value, suit) {
		if (!suit) {
			let ppn = _.isPlainObject(value) ? value : PPN.card(value);
			if (_.isPlainObject(ppn)) {
				suit = ppn.suit;
				value = ppn.value;
			}
		}

		if (!Value.isValid(value)) throw new Error("Invalid value: " + value);
		if (!Suit.isValid(suit)) throw new Error("Invalid suit: " + suit);

		this.value = Value.get(value);
		this.suit = Suit.get(suit);
		this.rank = Rank.get(this.value);

		this.label = _.toLower(this.value + '' + this.suit);
		this.ppn = PPN.get(this.label);

		this.string = _.toUpper(this.value) + _.upperFirst(this.suit);
		this.unicode = _.toUpper(this.value) + Suit.toUnicode(this.suit);
	}

	static compare(c1, c2, trump) {
		return c1.compareTo(c2, trump);
	}

	beats(card, trump) {
		return this.compareTo(card, trump) < 0;
	}

	compareTo(card, trump) {
		if (this.getSuit() === card.getSuit()) return card.getRank() - this.getRank();
		if (Suit.isValid(trump) && card.getSuit() === Suit.get(trump)) return 1;
		return -1;
	}

	getValue() {
		return this.value;
	}

	getSuit() {
		return this.suit;
	}

	getRank() {
		return this.rank;
	}

	getLabel() {
		return this.label;
	}

	getPPN() {
		return this.ppn;
	}

	toString() {
		return this.string;
	}

	toUnicodeString() {
		return this.unicode;
	}
}

module.exports = Card;