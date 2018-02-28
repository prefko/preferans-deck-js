#!/usr/bin/env node

'use strict';

const _ = require('lodash');

const convertToPPN = cards => _.join(_.map(cards, card => card.toPPN()), '');

class Cards {
	constructor(cards) {
		this.cards = _.clone(cards);
		this.original = _.clone(cards);
		return this;
	}

	get() {
		return _.clone(this.cards);
	}

	toPPN() {
		return convertToPPN(this.cards);
	}

	toString() {
		return _.join(_.map(this.cards, card => card.toString()), '');
	}

	toUnicodeString() {
		return _.join(_.map(this.cards, card => card.toUnicodeString()), '');
	}

	getOriginal() {
		return _.clone(this.original);
	}

	toOriginalPPN() {
		return convertToPPN(this.original);
	}

	toOriginalString() {
		return _.join(_.map(this.original, card => card.toString()), '');
	}

	toOriginalUnicodeString() {
		return _.join(_.map(this.original, card => card.toUnicodeString()), '');
	}

}

module.exports = Cards;
