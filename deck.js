#!/usr/bin/env node

'use strict';

const _ = require('lodash');
let Card = require('./card');

var card = new Card({suit: 'spade', value: 7, trump: false});

console.log(card.toString());
console.log(card.unicodeString());

