#!/usr/bin/env node

'use strict';

const _ = require('lodash');
let Card = require('./card');

var card1 = new Card({suit: 'spade', value: 7});
var card2 = new Card('8♦');
var card3 = new Card('10h');
var card4 = new Card('qclub');

console.log(card1.toString(), card1.toUnicodeString(), card1.getLabel(), card1.getPPN());
console.log(card2.toString(), card2.toUnicodeString(), card2.getLabel(), card2.getPPN());
console.log(card3.toString(), card3.toUnicodeString(), card3.getLabel(), card3.getPPN());
console.log(card4.toString(), card4.toUnicodeString(), card4.getLabel(), card4.getPPN());
