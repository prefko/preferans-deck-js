#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const Deck = require('./lib/deck');
const Card = require('./lib/deck').Card;
const Pile = require('./lib/deck').Pile;

var deck = new Deck();
deck.shuffle();
console.log(deck.getPPN());
let deal = deck.deal();
console.log(deal.p1.countSuits(), deal.p1.toString());
console.log(deal.p2.countSuits(), deal.p2.toString());
console.log(deal.p3.countSuits(), deal.p3.toString());
console.log(deal.t.countSuits(), deal.t.toString());

