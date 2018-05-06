#!/usr/bin/env node
'use strict';

const _ = require('lodash');

const ppns = Object.freeze({
	'7spade': '1',
	'8spade': '2',
	'9spade': '3',
	'xspade': '4',
	'jspade': '5',
	'qspade': '6',
	'kspade': '7',
	'aspade': '8',

	'7diamond': '9',
	'8diamond': 'A',
	'9diamond': 'B',
	'xdiamond': 'C',
	'jdiamond': 'D',
	'qdiamond': 'E',
	'kdiamond': 'F',
	'adiamond': 'G',

	'7heart': 'H',
	'8heart': 'I',
	'9heart': 'J',
	'xheart': 'K',
	'jheart': 'L',
	'qheart': 'M',
	'kheart': 'N',
	'aheart': 'O',

	'7club': 'P',
	'8club': 'Q',
	'9club': 'R',
	'xclub': 'S',
	'jclub': 'T',
	'qclub': 'U',
	'kclub': 'V',
	'aclub': 'W'
});
const make = key => ({value: _.first(key), suit: _.join(_.drop(key), '')});
const cards = Object.freeze(_.transform(ppns, (result, value, key) => result[value] = make(key), {}));

const getPPN = label => ppns[_.toLower(label)];
const getCard = ppn => cards[ppn];

module.exports = {
	all: () => _.values(ppns),
	ppn: getPPN,
	ppns: labels => _.map(labels, getPPN),
	card: getCard,
	cards: ppns => _.map(ppns, getCard)
};
