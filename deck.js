#!/usr/bin/env node

'use strict';

const _ = require('lodash');
let Card = require('./card');

var card1 = new Card({suit: 'spade', value: 7});
var card2 = new Card('7club');
var card3 = new Card('8h');
var card4 = new Card('K♦');

console.log(card1.toString(), card1.unicodeString());
console.log(card2.toString(), card2.unicodeString());
console.log(card3.toString(), card3.unicodeString());
console.log(card4.toString(), card4.unicodeString());

