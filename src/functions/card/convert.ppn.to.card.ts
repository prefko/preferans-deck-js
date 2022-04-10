'use strict';

import {get} from 'lodash';

import PrefDeckSuit from '../../enums/pref.deck.suit';
import PrefDeckCard from '../../pref.deck.card';

const PPN_CARDS = {
	'1': {suit: PrefDeckSuit.SPADE, value: 7},
	'2': {suit: PrefDeckSuit.SPADE, value: 8},
	'3': {suit: PrefDeckSuit.SPADE, value: 9},
	'4': {suit: PrefDeckSuit.SPADE, value: 10},
	'5': {suit: PrefDeckSuit.SPADE, value: 12},
	'6': {suit: PrefDeckSuit.SPADE, value: 13},
	'7': {suit: PrefDeckSuit.SPADE, value: 14},
	'8': {suit: PrefDeckSuit.SPADE, value: 15},

	'9': {suit: PrefDeckSuit.DIAMOND, value: 7},
	A: {suit: PrefDeckSuit.DIAMOND, value: 8},
	B: {suit: PrefDeckSuit.DIAMOND, value: 9},
	C: {suit: PrefDeckSuit.DIAMOND, value: 10},
	D: {suit: PrefDeckSuit.DIAMOND, value: 12},
	E: {suit: PrefDeckSuit.DIAMOND, value: 13},
	F: {suit: PrefDeckSuit.DIAMOND, value: 14},
	G: {suit: PrefDeckSuit.DIAMOND, value: 15},

	H: {suit: PrefDeckSuit.HEART, value: 7},
	I: {suit: PrefDeckSuit.HEART, value: 8},
	J: {suit: PrefDeckSuit.HEART, value: 9},
	K: {suit: PrefDeckSuit.HEART, value: 10},
	L: {suit: PrefDeckSuit.HEART, value: 12},
	M: {suit: PrefDeckSuit.HEART, value: 13},
	N: {suit: PrefDeckSuit.HEART, value: 14},
	O: {suit: PrefDeckSuit.HEART, value: 15},

	P: {suit: PrefDeckSuit.CLUB, value: 7},
	Q: {suit: PrefDeckSuit.CLUB, value: 8},
	R: {suit: PrefDeckSuit.CLUB, value: 9},
	S: {suit: PrefDeckSuit.CLUB, value: 10},
	T: {suit: PrefDeckSuit.CLUB, value: 12},
	U: {suit: PrefDeckSuit.CLUB, value: 13},
	V: {suit: PrefDeckSuit.CLUB, value: 14},
	W: {suit: PrefDeckSuit.CLUB, value: 15}
};

const convertPPNToCard = (ppn: string): PrefDeckCard => {
	const card: {suit: PrefDeckSuit; value: number} = get(PPN_CARDS, ppn, null);
	if (card) return new PrefDeckCard(card.suit, card.value);
	throw new Error('PrefDeckCard::ppnToCard:Invalid ppn: ' + ppn);
};
export default convertPPNToCard;
