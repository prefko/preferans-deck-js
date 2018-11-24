#!/usr/bin/env node
"use strict";

const _ = require("lodash");

const UNICODES = Object.freeze({spade: "♠", diamond: "♦", heart: "♥", club: "♣"});
const SUITS = Object.freeze({
	spade: "spade", s: "spade", "♠": "spade",
	diamond: "diamond", d: "diamond", "♦": "diamond",
	heart: "heart", h: "heart", "♥": "heart",
	club: "club", c: "club", "♣": "club"
});

const _getSuit = (label) => SUITS[_.toLower(label)];

module.exports = {
	suit: _getSuit,
	isValid: (label) => !!_getSuit(label),
	toUnicode: (suit) => UNICODES[_.toLower(suit)],
	all: () => _.keys(UNICODES)
};
