#!/usr/bin/env node

'use strict';

const _ = require('lodash');
let exports = module.exports;

// ------------------------------------------------------------------
//  @class  Card

let Card = exports.Card = function (definition) {
	if (_.isString(definition)) {

	} else if (_.isPlainObject(definition)) {
		this.suit = definition.suit;
		this.value = definition.value;
		this.trump = _.isBoolean(definition.trump) ? definition.trump : false;
	}
	this.suit = suit;
	this.value = value;
	this.trump = trump || false;
};

Card.prototype.toString = () => this.value + '' + this.suit;

Card.unicodeSuit = {heart: '♥', diamond: '♦', club: '♣', spade: '♠'};
Card.prototype.unicodeString = () => this.value + (Card.unicodeSuit[this.suit] || this.suit);
