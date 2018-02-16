#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const Deck = require('./lib/deck');
const Card = require('./lib/deck').Card;

var deck = new Deck();
deck.shuffle();
console.log(deck.isValid());
console.log(deck.toString());
console.log(deck.deal());
