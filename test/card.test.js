const _ = require('lodash');
const expect = require("chai").expect;

let Card = require("../lib/card");
let cards = [
	{
		card: new Card({value: 7, suit: "spade"}),
		string: '7Spade',
		unicode: '7♠',
		value: '7',
		suit: 'spade',
		rank: 7,
		label: '7spade',
		ppn: '1'
	}, {
		card: new Card(8, '♦'),
		string: '8Diamond',
		unicode: '8♦',
		value: '8',
		suit: 'diamond',
		rank: 8,
		label: '8diamond',
		ppn: 'A'
	}, {
		card: new Card('X', 'h'),
		string: 'XHeart',
		unicode: 'X♥',
		value: 'X',
		suit: 'heart',
		rank: 10,
		label: 'xheart',
		ppn: 'K'
	}, {
		card: new Card(12, 'd'),
		string: 'JDiamond',
		unicode: 'J♦',
		value: 'J',
		suit: 'diamond',
		rank: 12,
		label: 'jdiamond',
		ppn: 'D'
	}, {
		card: new Card({value: '13', suit: "club"}),
		string: 'QClub',
		unicode: 'Q♣',
		value: 'Q',
		suit: 'club',
		rank: 13,
		label: 'qclub',
		ppn: 'U'
	}
];

describe("Card tests", function () {
	it('Card should exist', function () {
		expect(Card).to.exist;
	});

	describe("Bad contructor tests", function () {
		let fails = [null, '5club', 'Ahearts', {value: 16, suit: '♣'}];
		_.forEach(fails, fail => {
			it('contructor should fail for value=' + JSON.stringify(fail), function () {
				expect(() => new Card(fail)).to.throw();
			});
			it('contructor should fail for suit=' + JSON.stringify(fail), function () {
				expect(() => new Card(7, fail)).to.throw();
			});
		});
	});

	describe("Single card tests", function () {
		_.forEach(cards, card => {
			it('should exist', function () {
				expect(card.card).to.exist;
			});
			it(card.string + ' toString should return ' + card.string, function () {
				expect(card.card.toString()).to.be.equal(card.string);
			});
			it(card.string + ' toUnicodeString should return ' + card.unicode, function () {
				expect(card.card.toUnicodeString()).to.be.equal(card.unicode);
			});
			it(card.string + ' getValue should return ' + card.value, function () {
				expect(card.card.getValue()).to.be.equal(card.value);
			});
			it(card.string + ' getSuit should return ' + card.suit, function () {
				expect(card.card.getSuit()).to.be.equal(card.suit);
			});
			it(card.string + ' getRank should return ' + card.rank, function () {
				expect(card.card.getRank()).to.be.equal(card.rank);
			});
			it(card.string + ' getLabel should return ' + card.label, function () {
				expect(card.card.getLabel()).to.be.equal(card.label);
			});
			it(card.string + ' getPPN should return ' + card.ppn, function () {
				expect(card.card.getPPN()).to.be.equal(card.ppn);
			});
		});
	});

	describe("Compare cards tests", function () {
		it('7Club should beat 8Heart', function () {
			let c1 = new Card('7', 'c');
			let c2 = new Card('8', 'h');
			expect(c1.beats(c2)).to.be.true;
		});
		it('7Club should not beat 8Club', function () {
			let c1 = new Card('7', 'c');
			let c2 = new Card('8', 'c');
			expect(c1.beats(c2)).to.be.false;
		});
		it('9Club should not beat 8Heart for trump h', function () {
			let c1 = new Card('9', 'c');
			let c2 = new Card('8', 'h');
			expect(c1.beats(c2, 'h')).to.be.false;
		});
		it('9Club should not beat 8Heart for trump Heart', function () {
			let c1 = new Card('9', 'c');
			let c2 = new Card('8', 'h');
			expect(c1.beats(c2, 'Heart')).to.be.false;
		});
		it('9Club should not beat 8Heart for trump ♥', function () {
			let c1 = new Card('9', 'c');
			let c2 = new Card('8', 'h');
			expect(c1.beats(c2, '♥')).to.be.false;
		});
		it('KClub should beat JClub for trump Club', function () {
			let c1 = new Card('K', 'c');
			let c2 = new Card('J', 'c');
			expect(c1.beats(c2, 'Club')).to.be.true;
		});
		it('7Club should not beat 8Club for trump Club', function () {
			let c1 = new Card('7', 'c');
			let c2 = new Card('8', 'c');
			expect(c1.beats(c2, 'Club')).to.be.false;
		});
	});
});
