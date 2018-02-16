#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const Card = require('./card');
const Suit = require('./suit');
const Value = require('./value');
const Rank = require('./rank');
const PPN = require('./ppn');

let tmpCards = [];
_.forEach(_.values(PPN.all()), ppn => tmpCards.push(new Card(PPN.card(ppn))));
const control = Object.freeze(tmpCards);

class Deck {
	constructor() {
		this.cards = _.clone(control);
	}

	isValid() {
		return _.isEmpty(_.difference(this.cards, control));
	}

	toString(pile = this.cards) {
		return _.join(_.map(pile, card => card.toUnicodeString()), ', ');
	}

	cut() {
		let cut = _.sample(weightedCuts);
		let left = _.slice(this.cards, 0, cut);
		let right = _.slice(this.cards, cut);
		this.cards = _.concat(right, left);
	}

	shuffle() {
		for (let i = 0; i < _.random(4, 6); i++)
			this.cards = _.shuffle(this.cards);
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
			p1: this.toString(_.concat(p1a, p1b)),
			p2: this.toString(_.concat(p2a, p2b)),
			p3: this.toString(_.concat(p3a, p3b)),
			t: this.toString(t)
		}
	}
}

module.exports = Deck;
module.exports.Card = Card;
module.exports.Suit = Suit;
module.exports.Value = Value;
module.exports.Rank = Rank;
module.exports.PPN = PPN;

let tmpCuts = [2, 3];
for (let i = 0; i < 2; i++)
	for (let j = 4; j <= 6; j++) tmpCuts.push(j);
for (let i = 0; i < 5; i++)
	for (let j = 7; j <= 10; j++) tmpCuts.push(j);
for (let i = 0; i < 8; i++)
	for (let j = 11; j <= 15; j++) tmpCuts.push(j);
const weightedCuts = Object.freeze(_.sortBy(_.concat(tmpCuts, _.map(tmpCuts, t => 31 - t))));
