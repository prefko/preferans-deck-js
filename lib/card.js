#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const Suit = require("./suit");
const Value = require("./value");
const Rank = require("./rank");
const PPN = require("./ppn");

class Card {
	constructor(value, suit) {
		if (_.isPlainObject(value) && !suit) {
			suit = value.suit;
			value = value.value;
		}

		if (!Value.isValid(value)) throw new Error("Invalid value: " + value);
		if (!Suit.isValid(suit)) throw new Error("Invalid suit: " + suit);

		this.value = Value.get(value);
		this.suit = Suit.get(suit);
		this.rank = Rank.get(this.value);

		this.label = _.toLower(this.value + '' + this.suit);
		this.ppn = PPN.get(this.label);

		this.string = _.toUpper(this.value) + '' + _.upperFirst(this.suit);
		this.unicode = _.toUpper(this.value) + Suit.toUnicode(this.suit);
	}

	beats(c, trump) {
		return this.compare(this, c, trump) < 0;
	}

	compare(c1, c2, trump) {
		return c1.compareTo(c2, trump);
	}

	compareTo(c, trump) {
		if (this.getSuit() === c.getSuit()) return c.getRank() - this.getRank();
		if (Suit.isValid(trump) && c.getSuit() === Suit.get(trump)) return 1;
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