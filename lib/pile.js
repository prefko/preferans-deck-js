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

	_sort1(config) {
		this.cards = sortSuit(this.cards, config.reverse);
		return this;
	}

	_sort2(config) {
		let red = _.concat(this.diamond, this.heart);
		let black = _.concat(this.spade, this.club);
		if (config.sorting === SORTING.RED) this.cards = _.concat(red, black);
		else this.cards = _.concat(black, red);
		return this;
	}

	_sort3(config) {
		let black = getSingleOrNull(this.spade, this.club);
		if (black) this.cards = _.concat(this.diamond, black, this.heart);
		let red = getSingleOrNull(this.diamond, this.heart);
		if (red) this.cards = _.concat(this.spade, red, this.club);
		return this;
	}

	_sort4(config) {
		if (config.sorting === SORTING.RED) this.cards = _.concat(this.diamond, this.spade, this.heart, this.club);
		if (config.sorting === SORTING.BLACK) this.cards = _.concat(this.spade, this.diamond, this.club, this.heart);
		return this;
	}

	sort(config) {
		config = cleanupConfig(config);
		if (config.sorting === SORTING.NONE) return this;

		let suits = countSuits(this.cards);
		if (suits < 2) return this._sort1(config);

		this.spade = sortSuit(this.spade, config.reverse);
		this.diamond = sortSuit(this.diamond, config.reverse);
		this.heart = sortSuit(this.heart, config.reverse);
		this.club = sortSuit(this.club, config.reverse);

		this.cards = _.concat(this.spade, this.diamond, this.heart, this.club);
		if (config.sorting === SORTING.SUITS) return this;

		if (suits === 2) return this._sort2(config);
		if (suits === 4) return this._sort4(config);
		return this._sort3(config);
	}
}

module.exports = Pile;
module.exports.SORTING = SORTING;
