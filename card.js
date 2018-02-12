#!/usr/bin/env node

'use strict';

const _ = require('lodash');

const unicodeSuit = Object.freeze({spade: '♠', diamond: '♦', heart: '♥', club: '♣'});
const values = Object.freeze({'7': '7', '8': '8', '9': '9', 'x': 'X', 'j': 'J', 'q': 'Q', 'k': 'K', 'a': 'A'});
const suits = Object.freeze({
	spade: 'spade', s: 'spade', '♠': 'spade',
	diamond: 'diamond', d: 'diamond', '♦': 'diamond',
	heart: 'heart', h: 'heart', '♥': 'heart',
	club: 'club', c: 'club', '♣': 'club'
});

let isValidSuit = suit => suits[_.toLower(suit)] ? true : false;
let isValidValue = value => values[_.toLower(value)] ? true : false;

class Card {
	constructor(definition) {
		if (_.isString(definition)) {
			this.value = _.toLower(_.first(definition));
			this.suit = _.toLower(_.join(_.drop(definition), ''));
		} else if (_.isPlainObject(definition)) {
			this.value = _.toLower(definition.value + '');
			this.suit = _.toLower(definition.suit);
		}
		if (!isValidValue(this.value)) throw new Error("Invalid value extracted: " + this.value);
		if (!isValidSuit(this.suit)) throw new Error("Invalid suit extracted: " + this.suit);
		this.value = values[this.value];
		this.suit = suits[this.suit];
	}

	getValue() {
		return this.value;
	}

	getSuit() {
		return this.suit;
	}

	compare(c1, c2, trump) {
		return c1.compareTo(c2, trump);
	}

	compareTo(c, trump) {
		if (this.getSuit() === c.getSuit()) return this.getValue() - c.getValue();
		if (isValidSuit(trump) && c.getSuit() === suits[trump]) return 1;
		return -1;
	}

	beats(c, trump) {
		return this.compareTo(c, trump) < 0;
	}

	toString() {
		return _.toUpper(this.value) + '' + _.upperFirst(this.suit);
	}

	unicodeString() {
		return _.toUpper(this.value) + (unicodeSuit[this.suit] || _.upperFirst(this.suit));
	}
}

module.exports = Card;