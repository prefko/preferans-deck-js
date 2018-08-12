#!/usr/bin/env node
"use strict";

const _ = require("lodash");

const unicodes = Object.freeze({spade: "♠", diamond: "♦", heart: "♥", club: "♣"});
const suits = Object.freeze({
	spade: "spade", s: "spade", "♠": "spade",
	diamond: "diamond", d: "diamond", "♦": "diamond",
	heart: "heart", h: "heart", "♥": "heart",
	club: "club", c: "club", "♣": "club"
});

const getSuit = label => suits[_.toLower(label)];

module.exports = {
	suit: getSuit,
	isValid: label => !!getSuit(label),
	toUnicode: suit => unicodes[_.toLower(suit)],
	all: () => _.keys(unicodes)
};
