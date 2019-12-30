#!/usr/bin/env node
'use strict';

import * as _ from 'lodash';
import { expect } from 'chai';

import PrefDeckTrick, { PrefDeckTrump } from '../src/prefDeckTrick';
import PrefDeckCard, { PrefDeckSuit, PrefDeckValue } from '../src/prefDeckCard';

const cope = 'p1';
const milja = 'p2';
const mitko = 'p3';

describe('PrefDeckTrick tests', () => {
	it('PrefDeckTrick should exist', () => {
		expect(PrefDeckTrick).to.exist;
	});

	describe('Contructor tests', () => {
		it('Pure constructor should return empty positions', () => {
			expect(new PrefDeckTrick(2).first).to.be.null;
			expect(new PrefDeckTrick(2).second).to.be.null;
			expect(new PrefDeckTrick(2).third).to.be.null;
			expect(new PrefDeckTrick(2).trump).to.be.equal(PrefDeckTrump.NONE);
			expect(new PrefDeckTrick(2).suit).to.be.undefined;
			expect(new PrefDeckTrick(2).ppn).to.be.equal('');
			expect(new PrefDeckTrick(2).string).to.be.equal('{"players":2,"first":{},"second":{},"third":{},"trump":""}');
			expect(() => new PrefDeckTrick(2).winner).to.throw();
		});
	});

	describe('Good trump constructor tests', () => {
		const suits = [PrefDeckSuit.SPADE, PrefDeckSuit.DIAMOND, PrefDeckSuit.HEART, PrefDeckSuit.CLUB];
		_.forEach(suits, (suit) => {
			it('constructor should pass for value=' + JSON.stringify(suit), () => {
				expect(new PrefDeckTrick(2, suit).trump).to.be.not.null;
				expect(new PrefDeckTrick(2, suit).trump).to.be.not.undefined;
				expect(new PrefDeckTrick(2).trump).to.be.equal(PrefDeckTrump.NONE);
				expect(new PrefDeckTrick(2, suit).suit).to.be.equal(suit);
			});
		});
	});

	describe('PrefDeckTrick throw 1 card test', () => {
		const trick = new PrefDeckTrick(2);
		trick.throw(cope, new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN));
		it('PrefDeckTrick throw 1 card test', () => {
			expect(trick.first).to.be.not.null;
			expect(trick.second).to.be.null;
			expect(trick.third).to.be.null;
			expect(trick.trump).to.be.equal(PrefDeckTrump.NONE);
			expect(trick.suit).to.be.undefined;
			expect(() => trick.winner).to.throw();
			expect(trick.ppn).to.be.equal('P');
			expect(trick.string).to.be.equal('{"players":2,"first":{"card":"7Club","player":"p1"},"second":{},"third":{},"trump":""}');
		});
	});

	describe('PrefDeckTrick throw 2 cards test', () => {
		const trick = new PrefDeckTrick(2);
		trick.throw(cope, new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN));
		trick.throw(milja, new PrefDeckCard(PrefDeckSuit.SPADE, PrefDeckValue.KING));
		it('PrefDeckTrick throw 2 cards test', () => {
			expect(trick.first).to.be.not.null;
			expect(trick.second).to.be.not.null;
			expect(trick.third).to.be.null;
			expect(trick.trump).to.be.equal(PrefDeckTrump.NONE);
			expect(trick.suit).to.be.undefined;
			expect(() => trick.winner).to.not.throw();
			expect(trick.winner).to.be.equal('p1');
			expect(trick.ppn).to.be.equal('P7');
			expect(trick.string).to.be.equal(
				'{' +
				'"players":2,' +
				'"first":{"card":"7Club","player":"p1"},' +
				'"second":{"card":"KSpade","player":"p2"},' +
				'"third":{},' +
				'"trump":"",' +
				'"winner":"p1"' +
				'}');
		});
	});

	describe('PrefDeckTrick throw 3 cards test', () => {
		const trick = new PrefDeckTrick(3);
		trick.throw(cope, new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN));
		trick.throw(milja, new PrefDeckCard(PrefDeckSuit.SPADE, PrefDeckValue.KING));
		trick.throw(mitko, new PrefDeckCard(PrefDeckSuit.DIAMOND, PrefDeckValue.QUEEN));
		it('PrefDeckTrick throw 3 cards test', () => {
			expect(trick.first).to.be.not.null;
			expect(trick.second).to.be.not.null;
			expect(trick.third).to.be.not.null;
			expect(trick.trump).to.be.equal(PrefDeckTrump.NONE);
			expect(trick.suit).to.be.undefined;
			expect(() => trick.winner).to.not.throw();
			expect(trick.winner).to.be.equal('p1');
			expect(trick.ppn).to.be.equal('P7E');
			expect(trick.string).to.be.equal(
				'{"players":3,' +
				'"first":{"card":"7Club","player":"p1"},' +
				'"second":{"card":"KSpade","player":"p2"},' +
				'"third":{"card":"QDiamond","player":"p3"},' +
				'"trump":"",' +
				'"winner":"p1"' +
				'}');
		});
	});

	describe('PrefDeckTrick throw 4 cards test', () => {
		const trick = new PrefDeckTrick(3);
		trick.throw(cope, new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN));
		trick.throw(milja, new PrefDeckCard(PrefDeckSuit.SPADE, PrefDeckValue.KING));
		trick.throw(mitko, new PrefDeckCard(PrefDeckSuit.DIAMOND, PrefDeckValue.QUEEN));
		it('PrefDeckTrick throw 4 cards test', () => {
			expect(() => trick.throw(cope, new PrefDeckCard(PrefDeckSuit.SPADE, PrefDeckValue.SEVEN))).to.throw();
		});
	});

	describe('PrefDeckTrick throw 1 card test with trump', () => {
		const trick = new PrefDeckTrick(2, PrefDeckSuit.HEART);
		trick.throw(cope, new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN));
		it('PrefDeckTrick throw 1 card test', () => {
			expect(trick.first).to.be.not.null;
			expect(trick.second).to.be.null;
			expect(trick.third).to.be.null;
			expect(trick.trump).to.be.equal('Heart');
			expect(trick.suit).to.be.equal('Heart');
			expect(() => trick.winner).to.throw();
			expect(trick.ppn).to.be.equal('P');
			expect(trick.string).to.be.equal('{"players":2,"first":{"card":"7Club","player":"p1"},"second":{},"third":{},"trump":"Heart"}');
		});
	});

	describe('PrefDeckTrick throw 2 cards test with trump', () => {
		const trick = new PrefDeckTrick(2, PrefDeckSuit.HEART);
		trick.throw(cope, new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN));
		trick.throw(milja, new PrefDeckCard(PrefDeckSuit.SPADE, PrefDeckValue.KING));
		it('PrefDeckTrick throw 2 cards test', () => {
			expect(trick.first).to.be.not.null;
			expect(trick.second).to.be.not.null;
			expect(trick.third).to.be.null;
			expect(trick.trump).to.be.equal(PrefDeckTrump.HEART);
			expect(trick.suit).to.be.equal(PrefDeckSuit.HEART);
			expect(() => trick.winner).to.not.throw();
			expect(trick.winner).to.be.equal('p1');
			expect(trick.ppn).to.be.equal('P7');
			expect(trick.string).to.be.equal(
				'{"players":2,' +
				'"first":{"card":"7Club","player":"p1"},' +
				'"second":{"card":"KSpade","player":"p2"},' +
				'"third":{},' +
				'"trump":"Heart",' +
				'"winner":"p1"' +
				'}');
		});
	});

	describe('PrefDeckTrick throw 2 cards test with trump', () => {
		const trick = new PrefDeckTrick(2, PrefDeckSuit.HEART);
		trick.throw(cope, new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN));
		trick.throw(milja, new PrefDeckCard(PrefDeckSuit.HEART, PrefDeckValue.SEVEN));
		it('PrefDeckTrick throw 2 cards test', () => {
			expect(trick.first).to.be.not.null;
			expect(trick.second).to.be.not.null;
			expect(trick.third).to.be.null;
			expect(trick.trump).to.be.equal(PrefDeckTrump.HEART);
			expect(trick.suit).to.be.equal(PrefDeckSuit.HEART);
			expect(() => trick.winner).to.not.throw();
			expect(trick.winner).to.be.equal('p2');
			expect(trick.ppn).to.be.equal('PH');
			expect(trick.string).to.be.equal(
				'{"players":2,' +
				'"first":{"card":"7Club","player":"p1"},' +
				'"second":{"card":"7Heart","player":"p2"},' +
				'"third":{},' +
				'"trump":"Heart",' +
				'"winner":"p2"' +
				'}');
		});
	});

	describe('PrefDeckTrick throw 3 cards test with trump', () => {
		const trick = new PrefDeckTrick(3, PrefDeckSuit.SPADE);
		trick.throw(cope, new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN));
		trick.throw(milja, new PrefDeckCard(PrefDeckSuit.SPADE, PrefDeckValue.SEVEN));
		trick.throw(mitko, new PrefDeckCard(PrefDeckSuit.SPADE, PrefDeckValue.QUEEN));
		it('PrefDeckTrick throw 3 cards test', () => {
			expect(trick.first).to.be.not.null;
			expect(trick.second).to.be.not.null;
			expect(trick.third).to.be.not.null;
			expect(trick.trump).to.be.equal(PrefDeckTrump.SPADE);
			expect(trick.suit).to.be.equal(PrefDeckSuit.SPADE);
			expect(() => trick.winner).to.not.throw();
			expect(trick.winner).to.be.equal('p3');
			expect(trick.ppn).to.be.equal('P16');
			expect(trick.string).to.be.equal('' +
				'{"players":3,' +
				'"first":{"card":"7Club","player":"p1"},' +
				'"second":{"card":"7Spade","player":"p2"},' +
				'"third":{"card":"QSpade","player":"p3"},' +
				'"trump":"Spade",' +
				'"winner":"p3"' +
				'}');
		});
	});

	describe('PrefDeckTrick throw 4 cards test with trump', () => {
		const trick = new PrefDeckTrick(3, PrefDeckSuit.HEART);
		trick.throw(cope, new PrefDeckCard(PrefDeckSuit.CLUB, PrefDeckValue.SEVEN));
		trick.throw(milja, new PrefDeckCard(PrefDeckSuit.HEART, PrefDeckValue.SEVEN));
		trick.throw(mitko, new PrefDeckCard(PrefDeckSuit.HEART, PrefDeckValue.QUEEN));
		it('PrefDeckTrick throw 4 cards test', () => {
			expect(() => trick.throw(cope, new PrefDeckCard(PrefDeckSuit.SPADE, PrefDeckValue.SEVEN))).to.throw();
		});
	});

});
