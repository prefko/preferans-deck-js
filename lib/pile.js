#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const Card = require('./card');

const SORTING = Object.freeze({
	NONE: 'NONE',
	RED: 'RED',
	BLACK: 'BLACK',	// default
	SUITS: 'SUITS'
});

const countSuits = cards => _.size(_.uniq(_.map(cards, 'suit')));

class Pile {
	constructor(cards) {
		this.cards = _.clone(cards);
	}

	getPPN() {
		return _.join(_.map(this.cards, card => card.getPPN()), '');
	}

	// TODO: remove
	countSuits() {
		return countSuits(this.cards);
	}

	toUnicodeString() {
		return _.join(_.map(this.cards, card => card.toUnicodeString()), '');
	}

	sort(config = {sorting: SORTING.BLACK}) {
		// TODO
	}

}

module.exports = Pile;
module.exports.SORTING = SORTING;
