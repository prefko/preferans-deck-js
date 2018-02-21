#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const PPN = require('./help/ppn');
const Card = require('./card');
const Pile = require('./pile');

let tmpCards = [];
_.forEach(_.values(PPN.all()), ppn => tmpCards.push(new Card(PPN.card(ppn))));
const control = Object.freeze(tmpCards);

let tmpCuts = [2, 3];
for (let i = 0; i < 2; i++)
	for (let j = 4; j <= 6; j++) tmpCuts.push(j);
for (let i = 0; i < 5; i++)
	for (let j = 7; j <= 10; j++) tmpCuts.push(j);
for (let i = 0; i < 8; i++)
	for (let j = 11; j <= 15; j++) tmpCuts.push(j);
const weightedCuts = Object.freeze(_.sortBy(_.concat(tmpCuts, _.map(tmpCuts, t => 31 - t))));

const count123Weighted = () => {
	let cnt = _.random(1, 25);
	return cnt <= 20 ? 1 : (cnt <= 24 ? 2 : 3);
};

const isValidDeck = cards => _.isEmpty(_.difference(cards, control)) && _.isEmpty(_.difference(control, cards));

const humanShuffle = cards => {
	let left = cards.splice(0, _.sample(weightedCuts));
	let right = _.clone(cards);

	cards = [];
	while (!_.isEmpty(left) || !_.isEmpty(right)) {
		if (!_.isEmpty(left)) cards = cards.concat(left.splice(0, count123Weighted()));
		if (!_.isEmpty(right)) cards = cards.concat(right.splice(0, count123Weighted()));
	}
	return cards;
};

const humanSimpleShuffle = cards => {
	let left = cards.splice(0, _.random(1, 9));
	let right = _.clone(cards);
	let toFront = true;

	cards = [].concat(left);
	while (!_.isEmpty(right)) {
		let cut = _.min([_.random(1, 9), _.size(right)]);
		let swap1 = right.splice(0, cut);

		if (true === toFront) cards = swap1.concat(cards);
		else cards = cards.concat(swap1);

		toFront = !toFront;
	}

	return cards;
};

class Deck {
	constructor() {
		this.cards = _.clone(control);
		return this;
	}

	isValid(cards = this.cards) {
		return isValidDeck(cards);
	}

	restore(cards) {
		if (!this.isValid(cards)) throw new Error("Invalid cards to restore from: " + cards);
		this.cards = _.clone(cards);
		return this;
	}

	getPPN() {
		return _.join(_.map(this.cards, card => card.getPPN()), '');
	}

	toString() {
		return _.join(_.map(this.cards, card => card.toUnicodeString()), '');
	}

	cut() {
		this.cards = this.cards.concat(this.cards.splice(0, _.sample(weightedCuts)));
		return this;
	}

	shuffle() {
		let shuffleSteps = _.range(0, _.random(1, 3));
		_.forEach(shuffleSteps, i => {
			this.cards = humanShuffle(this.cards);
		});

		let simpleShuffleSteps = _.range(0, count123Weighted());
		_.forEach(simpleShuffleSteps, () => {
			this.cards = humanSimpleShuffle(this.cards);
		});

		this.cut();

		if (!isValidDeck(this.cards)) throw new Error("Invalid deck after shuffle: " + this.cards);

		return this;
	}

	deal() {
		let p1a = _.slice(this.cards, 0, 5);
		let p2a = _.slice(this.cards, 5, 10);
		let p3a = _.slice(this.cards, 10, 15);
		let t = _.slice(this.cards, 15, 17);
		let p1b = _.slice(this.cards, 17, 22);
		let p2b = _.slice(this.cards, 22, 27);
		let p3b = _.slice(this.cards, 27, 32);

		return {
			p1: new Pile(_.concat(p1a, p1b)),
			p2: new Pile(_.concat(p2a, p2b)),
			p3: new Pile(_.concat(p3a, p3b)),
			t: new Pile(t)
		}
	}
}

module.exports = Deck;
module.exports.Card = Card;
module.exports.Pile = Pile;
