#!/usr/bin/env node

'use strict';
const rewire = require("rewire");
const _PPN = rewire("./lib/ppn");
console.log();

const _ = require('lodash');
let Card = require('./lib/card');

var card1 = new Card(7, 'spade');
var card2 = new Card(8, '♦');
var card3 = new Card(10, 'h');
var card4 = new Card('q', 'club');

console.log(card1.toString(), card1.toUnicodeString(), card1.getLabel(), card1.getRank(), card1.getPPN());
console.log(card2.toString(), card2.toUnicodeString(), card2.getLabel(), card2.getRank(), card2.getPPN());
console.log(card3.toString(), card3.toUnicodeString(), card3.getLabel(), card3.getRank(), card3.getPPN());
console.log(card4.toString(), card4.toUnicodeString(), card4.getLabel(), card4.getRank(), card4.getPPN());
