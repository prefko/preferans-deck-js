#!/usr/bin/env node

'use strict';

const _ = require('lodash');

class Card {
	constructor(definition) {
		if (_.isString(definition)) {

		} else if (_.isPlainObject(definition)) {
			this.suit = definition.suit;
			this.value = definition.value;
			this.trump = _.isBoolean(definition.trump) ? definition.trump : false;
		}
	}

	toString() {
		return this.value + '' + this.suit;
	}

	unicodeString() {
		return this.value + (Card.unicodeSuit[this.suit] || this.suit);
	}
}

Card.unicodeSuit = Object.freeze({
	spade: '♠',
	diamond: '♦',
	heart: '♥',
	club: '♣'
});

module.exports = Card;