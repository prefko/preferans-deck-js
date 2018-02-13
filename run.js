#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const Deck = require('./lib/deck');

var deck = new Deck();
var card = new Deck.Card(7, 's');
console.log(card);