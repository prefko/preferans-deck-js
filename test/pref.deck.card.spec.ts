'use strict';

import {expect} from 'chai';

import * as _ from 'lodash';

import PrefDeckCard from '../src/pref.deck.card';

import PrefDeckSuit from '../src/enums/pref.deck.suit';
import PrefDeckValue from '../src/enums/pref.deck.value';

const cards = [
	{
		card: new PrefDeckCard(PrefDeckSuit.SPADE, PrefDeckValue.SEVEN),
		label: '7Spade',
		unicode: '7♠',
		value: PrefDeckValue.SEVEN,
		suit: PrefDeckSuit.SPADE,
		ppn: '1'
	},
	{
		card: new PrefDeckCard(PrefDeckSuit.DIAMOND, PrefDeckValue.EIGHT),
		label: '8Diamond',
		unicode: '8♦',
		value: PrefDeckValue.EIGHT,
		suit: PrefDeckSuit.DIAMOND,
		ppn: 'A'
	},
	{
		card: new PrefDeckCard(PrefDeckSuit.HEART, PrefDeckValue.TEN),
		label: 'XHeart',
		unicode: 'X♥',
		value: PrefDeckValue.TEN,
		suit: PrefDeckSuit.HEART,
		ppn: 'K'
	},
	{
		card: new PrefDeckCard(PrefDeckSuit.DIAMOND, PrefDeckValue.JACK),
		label: 'JDiamond',
		unicode: 'J♦',
		value: PrefDeckValue.JACK,
		suit: PrefDeckSuit.DIAMOND,
		ppn: 'D'
	},
	{
		card: new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.QUEEN),
		label: 'QClub',
		unicode: 'Q♣',
		value: PrefDeckValue.QUEEN,
		suit: PrefDeckSuit.CLUB,
		ppn: 'U'
	}
];
const __PPNS = Object.freeze([
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'A',
	'B',
	'C',
	'D',
	'E',
	'F',
	'G',
	'H',
	'I',
	'J',
	'K',
	'L',
	'M',
	'N',
	'O',
	'P',
	'Q',
	'R',
	'S',
	'T',
	'U',
	'V',
	'W'
]);

describe('PrefDeckCard tests', () => {
	describe('PrefDeckCard constructor tests', () => {
		it('constructor should create card', () => {
			expect(() => new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.QUEEN)).to.not.throw();
			expect(new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.QUEEN)).to.be.an('object');
		});
	});

	describe('Basic ppnToCard tests', () => {
		_.forEach(__PPNS, (ppn: string): void => {
			it('ppnToCard should create card for ' + ppn, () => {
				expect(() => PrefDeckCard.ppnToCard('-')).to.throw();
				expect(() => PrefDeckCard.ppnToCard('Z')).to.throw();
				expect(() => PrefDeckCard.ppnToCard(ppn)).to.not.throw();
				expect(PrefDeckCard.ppnToCard(ppn)).to.be.an('object');
			});
		});
	});

	describe('Single card tests', () => {
		_.forEach(cards, (card: any): void => {
			it('should exist', () => {
				expect(card.card).to.be.an('object');
			});
			it(card.label + ' label should return ' + card.label, () => {
				expect(card.card.label).to.equal(card.label);
			});
			it(card.label + ' toUnicodeString should return ' + card.unicode, () => {
				expect(card.card.unicode).to.equal(card.unicode);
			});
			it(card.label + ' getValue should return ' + card.value, () => {
				expect(card.card.value).to.equal(card.value);
			});
			it(card.label + ' getSuit should return ' + card.suit, () => {
				expect(card.card.suit).to.equal(card.suit);
			});
			it(card.label + ' getLabel should return ' + card.label, () => {
				expect(card.card.label).to.equal(card.label);
			});
			it(card.label + ' getPPN should return ' + card.ppn, () => {
				expect(card.card.ppn).to.equal(card.ppn);
			});
		});
	});

	describe('Compare cards tests', () => {
		it('7Club should equal 7Club', () => {
			const c1 = new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN);
			const c2 = new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN);
			expect(c1.beats(c2)).to.equal(false);
			expect(PrefDeckCard.compare(c1, c2)).to.equal(0);
			expect(PrefDeckCard.winner(c1, c2)).to.deep.equal(c1);
		});
		it('7Club should beat 8Heart', () => {
			const c1 = new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN);
			const c2 = new PrefDeckCard(PrefDeckSuit.HEART, PrefDeckValue.EIGHT);
			expect(c1.beats(c2)).to.equal(true);
			expect(PrefDeckCard.compare(c1, c2)).to.equal(-1);
			expect(PrefDeckCard.winner(c1, c2)).to.deep.equal(c1);
		});
		it('7Club should not beat 8Club', () => {
			const c1 = new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN);
			const c2 = new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.EIGHT);
			expect(c1.beats(c2)).to.equal(false);
			expect(PrefDeckCard.compare(c1, c2)).to.equal(1);
			expect(PrefDeckCard.winner(c1, c2)).to.deep.equal(c2);
		});
		it('9Club should not beat 8Heart for trump h', () => {
			const c1 = new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.NINE);
			const c2 = new PrefDeckCard(PrefDeckSuit.HEART, PrefDeckValue.EIGHT);
			expect(c1.beats(c2, PrefDeckSuit.HEART)).to.equal(false);
			expect(PrefDeckCard.compare(c1, c2, PrefDeckSuit.HEART)).to.equal(1);
			expect(PrefDeckCard.winner(c1, c2, PrefDeckSuit.HEART)).to.deep.equal(c2);
		});
		it('9Club should not beat 8Heart for trump Heart', () => {
			const c1 = new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.NINE);
			const c2 = new PrefDeckCard(PrefDeckSuit.HEART, PrefDeckValue.EIGHT);
			expect(c1.beats(c2, PrefDeckSuit.HEART)).to.equal(false);
			expect(PrefDeckCard.compare(c1, c2, PrefDeckSuit.HEART)).to.equal(1);
			expect(PrefDeckCard.winner(c1, c2, PrefDeckSuit.HEART)).to.deep.equal(c2);
		});
		it('9Club should not beat 8Heart for trump ♥', () => {
			const c1 = new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.NINE);
			const c2 = new PrefDeckCard(PrefDeckSuit.HEART, PrefDeckValue.EIGHT);
			expect(c1.beats(c2, PrefDeckSuit.HEART)).to.equal(false);
			expect(PrefDeckCard.compare(c1, c2, PrefDeckSuit.HEART)).to.equal(1);
			expect(PrefDeckCard.winner(c1, c2, PrefDeckSuit.HEART)).to.deep.equal(c2);
		});
		it('KClub should beat JClub for trump Club', () => {
			const c1 = new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.KING);
			const c2 = new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.JACK);
			expect(c1.beats(c2, PrefDeckSuit.CLUB)).to.equal(true);
			expect(PrefDeckCard.compare(c1, c2, PrefDeckSuit.CLUB)).to.equal(-1);
			expect(PrefDeckCard.winner(c1, c2, PrefDeckSuit.CLUB)).to.deep.equal(c1);
		});
		it('7Club should not beat 8Club for trump Club', () => {
			const c1 = new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN);
			const c2 = new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.EIGHT);
			expect(c1.beats(c2, PrefDeckSuit.CLUB)).to.equal(false);
			expect(PrefDeckCard.compare(c1, c2, PrefDeckSuit.CLUB)).to.equal(1);
			expect(PrefDeckCard.winner(c1, c2, PrefDeckSuit.CLUB)).to.deep.equal(c2);
		});
	});
});
