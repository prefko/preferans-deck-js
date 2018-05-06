#!/usr/bin/env node
'use strict';

const _ = require('lodash');

const ranks = Object.freeze({'7': 7, '8': 8, '9': 9, 'x': 10, 'j': 12, 'q': 13, 'k': 14, 'a': 15});

module.exports = {
	get: value => ranks[_.toLower(value + '')],
	all: () => _.values(ranks)
};
