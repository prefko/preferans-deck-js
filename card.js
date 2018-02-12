#!/usr/bin/env node

'use strict';

const _ = require('lodash');

const unicodes = Object.freeze({spade: '♠', diamond: '♦', heart: '♥', club: '♣'});
const values = Object.freeze({'7': '7', '8': '8', '9': '9', 'x': 'X', '10': 'X', 'j': 'J', '12': 'J', 'q': 'Q', '13': 'Q', 'k': 'K', '14': 'K', 'a': 'A', '15': 'A'});
const ranks = Object.freeze({'7': 7, '8': 8, '9': 9, 'x': 10, 'j': 12, 'q': 13, 'k': 14, 'a': 15});
const suits = Object.freeze({
	spade: 'spade', s: 'spade', '♠': 'spade',
	diamond: 'diamond', d: 'diamond', '♦': 'diamond',
	heart: 'heart', h: 'heart', '♥': 'heart',
	club: 'club', c: 'club', '♣': 'club'
});

const ppns = Object.freeze({
	'7spade': '1',
	'8spade': '2',
	'9spade': '3',
	'xspade': '4',
	'jspade': '5',
	'qspade': '6',
	'kspade': '7',
	'aspade': '8',

	'7diamond': '9',
	'8diamond': 'A',
	'9diamond': 'B',
	'xdiamond': 'C',
	'jdiamond': 'D',
	'qdiamond': 'E',
	'kdiamond': 'F',
	'adiamond': 'G',

	'7heart': 'H',
	'8heart': 'I',
	'9heart': 'J',
	'xheart': 'K',
	'jheart': 'L',
	'qheart': 'M',
	'kheart': 'N',
	'aheart': 'O',

	'7club': 'P',
	'8club': 'Q',
	'9club': 'R',
	'xclub': 'S',
	'jclub': 'T',
	'qclub': 'U',
	'kclub': 'V',
	'aclub': 'W'
});

let extraxtSuit = suit => suits[_.toLower(suit)];
let extraxtValue = value => values[_.toLower(value)];
let extraxtRank = value => ranks[_.toLower(value)];

let isValidSuit = suit => extraxtSuit(suit) ? true : false;
let isValidValue = value => extraxtValue(value) ? true : false;

class Card {
	constructor(definition) {
		if (_.isString(definition)) {
			if (_.startsWith(definition, '1')) {
				this.value = definition.substring(0, 2);
				this.suit = _.toLower(_.join(_.drop(definition, 2), ''));
			} else {
				this.value = _.toLower(_.first(definition));
				this.suit = _.toLower(_.join(_.drop(definition), ''));
			}
		} else if (_.isPlainObject(definition)) {
			this.value = _.toLower(definition.value + '');
			this.suit = _.toLower(definition.suit);
		}

		if (!isValidValue(this.value)) throw new Error("Invalid value extracted: " + this.value);
		if (!isValidSuit(this.suit)) throw new Error("Invalid suit extracted: " + this.suit);

		this.value = extraxtValue(this.value);
		this.suit = extraxtSuit(this.suit);
		this.rank = extraxtRank(this.value);

		this.label = _.toLower(this.value + '' + this.suit);
		this.ppn = ppns[this.label];
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

	beats(c, trump) {
		return this.compare(this, c, trump) < 0;
	}

	compare(c1, c2, trump) {
		return c1.compareTo(c2, trump);
	}

	compareTo(c, trump) {
		if (this.getSuit() === c.getSuit()) return c.getRank() - this.getRank();
		if (isValidSuit(trump) && c.getSuit() === extraxtSuit(trump)) return 1;
		return -1;
	}

	toString() {
		return _.toUpper(this.value) + '' + _.upperFirst(this.suit);
	}

	toUnicodeString() {
		return _.toUpper(this.value) + unicodes[this.suit];
	}
}

module.exports = Card;