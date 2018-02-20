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

class Deck {
	constructor() {
		this.cards = _.clone(control);
	}

	isValid(cards = this.cards) {
		return _.isEmpty(_.difference(cards, control)) && _.isEmpty(_.difference(control, cards));
	}

	restore(cards) {
		if (!this.isValid(cards)) throw new Error("Invalid cards to restore from: " + cards);

		// TODO:
	}

	getPPN() {
		return _.join(_.map(this.cards, card => card.getPPN()), '');
	}

	toString() {
		return _.join(_.map(this.cards, card => card.toUnicodeString()), '');
	}

	cut() {
		let cut = _.sample(weightedCuts);
		let left = _.slice(this.cards, 0, cut);
		let right = _.slice(this.cards, cut);
		this.cards = _.concat(right, left);
	}

	shuffle() {
		// TODO: improve

		for (let i = 0; i < _.random(1, 3); i++) {
			this.cards = _.shuffle(this.cards);
		}
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
