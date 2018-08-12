#!/usr/bin/env node
"use strict";

const _ = require("lodash");

const values = Object.freeze({"7": "7", "8": "8", "9": "9", "x": "X", "10": "X", "j": "J", "12": "J", "q": "Q", "13": "Q", "k": "K", "14": "K", "a": "A", "15": "A"});

const getValue = label => values[_.toLower(label + "")];

module.exports = {
	value: getValue,
	isValid: label => !!getValue(label),
	all: () => _.uniq(_.values(values))
};
