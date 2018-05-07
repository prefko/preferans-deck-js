#!/usr/bin/env node
'use strict';

const _ = require('lodash');
const Deck = require('./lib/deck');
const Card = Deck.Card;
const Pile = Deck.Pile;

let card = new Card('7');
console.log(card.toString());

let deck = new Deck();
console.log(deck.getPPN());
console.log(deck.toUnicodeString());
console.log(deck.shuffle().toUnicodeString());

let deal = deck.deal();
console.log(
	deal.p1.sort().toUnicodeString(), '| ',
	deal.p2.sort().toUnicodeString(), '| ',
	deal.p3.sort().toUnicodeString(), '| ',
	deal.t.toUnicodeString());

console.log('\n');

deck.restore(
	_.concat(
		deal.p1.all(),
		deal.p2.all(),
		deal.p3.all(),
		deal.t.all()
	)
);
console.log(deck.toUnicodeString());
console.log(deck.shuffle().toUnicodeString());
