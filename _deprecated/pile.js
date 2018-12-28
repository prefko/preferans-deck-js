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

const _countSuits = (cards) => _.size(_.uniq(_.map(cards, "suit")));
const _sortSuit = (cards, reverse = false) => {
	cards = _.sortBy(cards, ["rank"]);
	if (true === reverse) cards = _.reverse(cards);
	return cards;
};
const _getCardsOfSuit = (cards, suit) => _.filter(cards, ["suit", suit]);

const _cleanupSorting = (sorting = {type: SORTING.BLACK}) => _.merge({type: SORTING.BLACK}, sorting);

const _getSingleOrNull = (a, b) => {
	if (_.isEmpty(a)) return b;
	if (_.isEmpty(b)) return a;
	return null;
};

const _sortSuits = (pile, reverse) => {
	pile.spade = _sortSuit(pile.spade, reverse);
	pile.diamond = _sortSuit(pile.diamond, reverse);
	pile.heart = _sortSuit(pile.heart, reverse);
	pile.club = _sortSuit(pile.club, reverse);
	return pile;
};

const _sort2 = (pile, type) => {
	let red = _.concat(pile.diamond, pile.heart);
	let black = _.concat(pile.spade, pile.club);
	pile.cards = type === SORTING.RED ? _.concat(red, black) : _.concat(black, red);
	return pile;
};

const _sort3 = (pile) => {
	let black = _getSingleOrNull(pile.spade, pile.club);
	if (black) pile.cards = _.concat(pile.diamond, black, pile.heart);
	let red = _getSingleOrNull(pile.diamond, pile.heart);
	if (red) pile.cards = _.concat(pile.spade, red, pile.club);
	return pile;
};

const _sort4 = (pile, type) => {
	if (type === SORTING.RED) pile.cards = _.concat(pile.diamond, pile.spade, pile.heart, pile.club);
	if (type === SORTING.BLACK) pile.cards = _.concat(pile.spade, pile.diamond, pile.club, pile.heart);
	return pile;
};

const _sortX = (pile, type) => {
	let suits = _countSuits(pile.cards);
	if (suits === 2) return _sort2(pile, type);
	if (suits === 3) return _sort3(pile);
	if (suits === 4) return _sort4(pile, type);
	return pile;
};

class Pile extends Cards {
	constructor(cards) {
		super(cards);

		this.spade = _getCardsOfSuit(this.cards, "spade");
		this.diamond = _getCardsOfSuit(this.cards, "diamond");
		this.heart = _getCardsOfSuit(this.cards, "heart");
		this.club = _getCardsOfSuit(this.cards, "club");

		return this;
	}

	sort(sorting) {
		sorting = _cleanupSorting(sorting);
		if (sorting.type === SORTING.NONE) return this;

		_sortSuits(this, sorting.reverse);
		this.cards = _.concat(this.spade, this.diamond, this.heart, this.club);
		if (sorting.type === SORTING.SUITS) return this;

		return _sortX(this, sorting.type);
	}
}

module.exports = Pile;
module.exports.SORTING = SORTING;
