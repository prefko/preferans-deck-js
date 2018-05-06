#!/usr/bin/env node
'use strict';

const _ = require('lodash');

const unicodes = Object.freeze({spade: '♠', diamond: '♦', heart: '♥', club: '♣'});
const suits = Object.freeze({
	spade: 'spade', s: 'spade', '♠': 'spade',
	diamond: 'diamond', d: 'diamond', '♦': 'diamond',
	heart: 'heart', h: 'heart', '♥': 'heart',
	club: 'club', c: 'club', '♣': 'club'
});

let getSuit = s => suits[_.toLower(s)];

module.exports = {
	suit: getSuit,
	isValid: s => getSuit(s) ? true : false,
	toUnicode: s => unicodes[_.toLower(s)],
	all: () => _.keys(unicodes)
};
