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
const sortSuit = (cards, reverse) => {
	cards = _.sortBy(cards, ['rank']);
	if (reverse) cards = _.reverse(cards);
	return cards;
};
const getCardsOfSuit = suit => _.filter(this.cards, ['suit', suit]);

class Pile {
	constructor(cards) {
		this.cards = _.clone(cards);
		// this.sort({reverse: true});
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
		if (config.sorting === SORTING.NONE) return;

		let suits = countSuits(this.cards);
		if (suits < 2) {
			this.cards = sortSuit(this.cards, config.reverse);
			return;
		}

		let spade = sortSuit(getCardsOfSuit('spade'), config.reverse);
		let diamond = sortSuit(getCardsOfSuit('diamond'), config.reverse);
		let heart = sortSuit(getCardsOfSuit('heart'), config.reverse);
		let club = sortSuit(getCardsOfSuit('club'), config.reverse);

		if (config.sorting === SORTING.SUITS) {
			this.cards = _.concat(spade, diamond, heart, club);
			return;
		}

		if (suits === 2) {
			let red = _.concat(diamond, heart);
			let black = _.concat(spade, club);
			if (config.sorting === SORTING.RED) {
				this.cards = _.concat(red, black);
			}
			if (config.sorting === SORTING.BLACK) {
				this.cards = _.concat(black, red);
			}
			return;
		}

		if (suits === 4) {
			if (config.sorting === SORTING.RED) {
				this.cards = _.concat(diamond, spade, heart, club);
			}
			if (config.sorting === SORTING.BLACK) {
				this.cards = _.concat(spade, diamond, club, heart);
			}
			return;
		}

		if (_.isEmpty(spade)) this.cards = _.concat(diamond, club, heart);
		if (_.isEmpty(diamond)) this.cards = _.concat(spade, heart, club);
		if (_.isEmpty(heart)) this.cards = _.concat(spade, diamond, club);
		if (_.isEmpty(club)) this.cards = _.concat(diamond, spade, heart);
	}

}

module.exports = Pile;
module.exports.SORTING = SORTING;
