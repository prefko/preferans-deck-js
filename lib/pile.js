#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const Cards = require("./cards");

const SORTING = Object.freeze({
	NONE: "NONE",
	RED: "RED",
	BLACK: "BLACK",	// default
	SUITS: "SUITS"
});

const countSuits = (cards) => _.size(_.uniq(_.map(cards, "suit")));
const sortSuit = (cards, reverse = false) => {
	cards = _.sortBy(cards, ["rank"]);
	if (true === reverse) cards = _.reverse(cards);
	return cards;
};
const getCardsOfSuit = (cards, suit) => _.filter(cards, ["suit", suit]);

const cleanupConfig = (config = {sorting: SORTING.BLACK}) => {
	return _.merge({sorting: SORTING.BLACK}, config);
};

const getSingleOrNull = (a, b) => {
	if (_.isEmpty(a)) return b;
	if (_.isEmpty(b)) return a;
	return null;
};

class Pile extends Cards {
	constructor(cards) {
		super(cards);

		this.spade = getCardsOfSuit(this.cards, "spade");
		this.diamond = getCardsOfSuit(this.cards, "diamond");
		this.heart = getCardsOfSuit(this.cards, "heart");
		this.club = getCardsOfSuit(this.cards, "club");

		return this;
	}

	_sort2(sorting) {
		let red = _.concat(this.diamond, this.heart);
		let black = _.concat(this.spade, this.club);
		this.cards = sorting === SORTING.RED ? _.concat(red, black) : _.concat(black, red);
		return this;
	}

	_sort3() {
		let black = getSingleOrNull(this.spade, this.club);
		if (black) this.cards = _.concat(this.diamond, black, this.heart);
		let red = getSingleOrNull(this.diamond, this.heart);
		if (red) this.cards = _.concat(this.spade, red, this.club);
		return this;
	}

	_sort4(sorting) {
		if (sorting === SORTING.RED) this.cards = _.concat(this.diamond, this.spade, this.heart, this.club);
		if (sorting === SORTING.BLACK) this.cards = _.concat(this.spade, this.diamond, this.club, this.heart);
		return this;
	}

	_sortSuits(reverse) {
		this.spade = sortSuit(this.spade, reverse);
		this.diamond = sortSuit(this.diamond, reverse);
		this.heart = sortSuit(this.heart, reverse);
		this.club = sortSuit(this.club, reverse);
	}

	_sortX(sorting) {
		let suits = countSuits(this.cards);
		if (suits === 2) return this._sort2(sorting);
		if (suits === 3) return this._sort3();
		if (suits === 4) return this._sort4(sorting);
		return this;
	}

	sort(config) {
		config = cleanupConfig(config);
		if (config.sorting === SORTING.NONE) return this;

		this._sortSuits(config.reverse);
		this.cards = _.concat(this.spade, this.diamond, this.heart, this.club);
		if (config.sorting === SORTING.SUITS) return this;

		return this._sortX(config.sorting);
	}
}

module.exports = Pile;
module.exports.SORTING = SORTING;
