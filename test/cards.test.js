const _ = require('lodash');
const expect = require('chai').expect;
let PPN = require('../lib/help/ppn');
let Card = require('../lib/card');
let Cards = require('../lib/help/cards');

let tmpCards = [];
_.forEach(_.values(PPN.all()), ppn => tmpCards.push(new Card(PPN.card(ppn))));
const fullDeck = Object.freeze(tmpCards);

const ppnString = '123456789ABCDEFGHIJKLMNOPQRSTUVW';
const unicodeString = '7♠8♠9♠X♠J♠Q♠K♠A♠7♦8♦9♦X♦J♦Q♦K♦A♦7♥8♥9♥X♥J♥Q♥K♥A♥7♣8♣9♣X♣J♣Q♣K♣A♣';
const fullString = '7Spade8Spade9SpadeXSpadeJSpadeQSpadeKSpadeASpade7Diamond8Diamond9DiamondXDiamondJDiamondQDiamondKDiamondADiamond7Heart8Heart9HeartXHeartJHeartQHeartKHeartAHeart7Club8Club9ClubXClubJClubQClubKClubAClub';

describe('Cards tests', function () {
	it('Cards should exist', function () {
		expect(Cards).to.exist;
	});

	describe('Cards constructor/getters tests', function () {
		let cards = new Cards(fullDeck);
		it('contructor should create object', function () {
			expect(() => new Cards(fullDeck)).to.not.throw();
			expect(cards).to.be.a('object');
		});
		it('Cards all should return array', function () {
			expect(cards.all()).to.be.an('array');
		});
		it('Cards all should return 32 cards', function () {
			expect(cards.all()).to.have.lengthOf(32);
		});
		it('Cards getPPN should equal to ' + ppnString, function () {
			expect(cards.getPPN()).to.be.equal(ppnString);
		});
		it('Cards toString should equal to ' + fullString, function () {
			expect(cards.toString()).to.be.equal(fullString);
		});
		it('Cards toUnicodeString should equal to ' + unicodeString, function () {
			expect(cards.toUnicodeString()).to.be.equal(unicodeString);
		});
	});

	describe('Cards original tests', function () {
		let cards = new Cards(fullDeck);
		let original = cards.getOriginal();
		it('Cards original should be an array', function () {
			expect(original).to.be.an('array');
		});
		it('Cards original should return 32 cards', function () {
			expect(original).to.have.lengthOf(32);
		});
		it('Cards getOriginalPPN should equal to ' + ppnString, function () {
			expect(cards.getOriginalPPN()).to.be.equal(ppnString);
		});
		it('Cards toOriginalString should equal to ' + fullString, function () {
			expect(cards.toOriginalString()).to.be.equal(fullString);
		});
		it('Cards toOriginalUnicodeString should equal to ' + unicodeString, function () {
			expect(cards.toOriginalUnicodeString()).to.be.equal(unicodeString);
		});
	});

});
