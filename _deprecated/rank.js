#!/usr/bin/env node
"use strict";

const _ = require("lodash");

const RANKS = Object.freeze({"7": 7, "8": 8, "9": 9, "x": 10, "j": 12, "q": 13, "k": 14, "a": 15});

const _getRank = (value) => RANKS[_.toLower(value + "")];

module.exports = {
	rank: _getRank,
	isValid: (value) => !!_getRank(value),
	all: () => _.values(RANKS)
};

// This is no longer needed - Value is now numeric and thus has the rank in it.