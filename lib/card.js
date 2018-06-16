#!/usr/bin/env node
'use strict';

const _ = require('lodash');
const Suit = require("./help/suit");
const Value = require("./help/value");
const Rank = require("./help/rank");
const PPN = require("./help/ppn");

const compare = (c1, c2, trump) => {
	if (c1.getSuit() === c2.getSuit()) return c2.getRank() - c1.getRank();
	if (Suit.isValid(trump) && c2.getSuit() === Suit.suit(trump)) return 1;
	return -1;
};

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

		this.value = Value.value(value);
		this.suit = Suit.suit(suit);
		this.rank = Rank.rank(this.value);

		this.label = _.toLower(this.value + '' + this.suit);
		this.ppn = PPN.ppn(this.label);

		this.string = _.toUpper(this.value) + _.upperFirst(this.suit);
		this.unicode = _.toUpper(this.value) + Suit.toUnicode(this.suit);

		return this;
	}

	static compare(c1, c2, trump) {
		return compare(c1, c2, trump);
	}

	beats(card, trump) {
		return compare(this, card, trump) < 0;
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
module.exports.Suit = Suit;
module.exports.Value = Value;
module.exports.Rank = Rank;
module.exports.PPN = PPN;