#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const Card = require('./card');

const SORTING = Object.freeze({
	NONE: 'NONE',
	RED: 'RED',		// default
	BLACK: 'BLACK',
	SUITS: 'SUITS'
});

class Pile {
	constructor(cards) {
		this.cards = _.clone(cards);
	}

	getPPN() {
		return _.join(_.map(this.cards, card => card.getPPN()), '');
	}

	toString() {
		return _.join(_.map(this.cards, card => card.toUnicodeString()), ', ');
	}

	countSuits() {
		return _.size(_.uniq(_.map(this.cards, 'suit')));
	}

	sort() {
		// TODO
	}

}

module.exports = Pile;
module.exports.SORTING = SORTING;
