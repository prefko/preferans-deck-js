#!/usr/bin/env node
'use strict';

const _ = require('lodash');

const ranks = Object.freeze({'7': 7, '8': 8, '9': 9, 'x': 10, 'j': 12, 'q': 13, 'k': 14, 'a': 15});

let getRank = r => ranks[_.toLower(r + '')];

module.exports = {
	rank: getRank,
	isValid: r => getRank(r) ? true : false,
	all: () => _.values(ranks)
};
