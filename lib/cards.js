#!/usr/bin/env node
"use strict";

const _ = require("lodash");

const toPPN = (cards) => _.join(_.map(cards, c => c.getPPN()), "");

class Cards {
	constructor(cards) {
		this.cards = _.clone(cards);
		this.original = _.clone(cards);
		return this;
	}

	all() {
		return _.clone(this.cards);
	}

	getPPN() {
		return toPPN(this.cards);
	}

	toString() {
		return _.join(_.map(this.cards, (c) => c.toString()), "");
	}

	toUnicodeString() {
		return _.join(_.map(this.cards, (c) => c.toUnicodeString()), "");
	}

	getOriginal() {
		return _.clone(this.original);
	}

	getOriginalPPN() {
		return toPPN(this.original);
	}

	toOriginalString() {
		return _.join(_.map(this.original, (c) => c.toString()), "");
	}

	toOriginalUnicodeString() {
		return _.join(_.map(this.original, (c) => c.toUnicodeString()), "");
	}
}

module.exports = Cards;
