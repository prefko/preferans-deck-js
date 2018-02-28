#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const Deck = require('./lib/deck');
const Card = require('./lib/deck').Card;
const Pile = require('./lib/deck').Pile;

let card = new Card('7');
console.log(card.toString());

let deck = new Deck();
console.log(deck.toPPN());
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
		deal.p1.get(),
		deal.p2.get(),
		deal.p3.get(),
		deal.t.get()
	)
);
console.log(deck.toUnicodeString());
console.log(deck.shuffle().toUnicodeString());
