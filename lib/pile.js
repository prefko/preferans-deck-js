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
const getCardsOfSuit = (cards, suit) => _.filter(cards, ['suit', suit]);

class Pile {
	constructor(cards) {
		this.cards = _.clone(cards);
		this.original = _.clone(cards);
		return this;
	}

	get() {
		return _.clone(this.cards);
	}

	getPPN() {
		return _.join(_.map(this.cards, card => card.getPPN()), '');
	}

	getOriginal() {
		return _.clone(this.original);
	}

	getOriginalPPN() {
		return _.join(_.map(this.original, card => card.getPPN()), '');
	}

	toUnicodeString() {
		return _.join(_.map(this.cards, card => card.toUnicodeString()), '');
	}

	sort(config) {
		if (!_.isPlainObject(config)) config = {sorting: SORTING.BLACK};
		if (!config.sorting) config.sorting = SORTING.BLACK;
		if (config.sorting === SORTING.NONE) return this;

		let suits = countSuits(this.cards);

		if (suits < 2) {
			this.cards = sortSuit(this.cards, config.reverse);
			return this;
		}

		let spade = sortSuit(getCardsOfSuit(this.cards, 'spade'), config.reverse);
		let diamond = sortSuit(getCardsOfSuit(this.cards, 'diamond'), config.reverse);
		let heart = sortSuit(getCardsOfSuit(this.cards, 'heart'), config.reverse);
		let club = sortSuit(getCardsOfSuit(this.cards, 'club'), config.reverse);

		if (config.sorting === SORTING.SUITS) {
			this.cards = _.concat(spade, diamond, heart, club);
			return this;
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
			return this;
		}

		if (suits === 4) {
			if (config.sorting === SORTING.RED) {
				this.cards = _.concat(diamond, spade, heart, club);
			}
			if (config.sorting === SORTING.BLACK) {
				this.cards = _.concat(spade, diamond, club, heart);
			}
			return this;
		}

		if (_.isEmpty(spade)) this.cards = _.concat(diamond, club, heart);
		if (_.isEmpty(diamond)) this.cards = _.concat(spade, heart, club);
		if (_.isEmpty(heart)) this.cards = _.concat(spade, diamond, club);
		if (_.isEmpty(club)) this.cards = _.concat(diamond, spade, heart);

		return this;
	}

}

module.exports = Pile;
module.exports.SORTING = SORTING;
