#!/usr/bin/env node
"use strict";

const _ = require("lodash");
const Deck = require("./lib/deck");
const Card = Deck.Card;
const Pile = Deck.Pile;

let card = new Card("7");
console.log(card.toString());

const PPN = Card.PPN;
const Suit = Card.Suit;
const Value = Card.Value;
const Rank = Card.Rank;
console.log("PPNs:", JSON.stringify(PPN.all()));
console.log("Suits:", Suit.all());
console.log("Values:", Value.all());
console.log("Ranks:", Rank.all());

let deck = new Deck();
console.log("Init deck PPN:", deck.getPPN());
console.log("Init deck Unicode:", deck.toUnicodeString());
console.log("Shuffled deck:", deck.shuffle().toUnicodeString());

let deal = deck.deal();
console.log("Deal:",
	deal.p1.sort().toUnicodeString(), "| ",
	deal.p2.sort().toUnicodeString(), "| ",
	deal.p3.sort().toUnicodeString(), "| ",
	deal.t.toUnicodeString());

console.log("\n");

deck.restore(
	_.concat(
		deal.p1.all(),
		deal.p2.all(),
		deal.p3.all(),
		deal.t.all()
	)
);
console.log("Restored deck Unicode:", deck.toUnicodeString());
console.log("Shuffled restored deck:", deck.shuffle().toUnicodeString());
