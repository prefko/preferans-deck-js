#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const Deck = require('./lib/deck');
const Card = require('./lib/deck').Card;

// var deck = new Deck();
var card = new Card(7, 's');
console.log(card);