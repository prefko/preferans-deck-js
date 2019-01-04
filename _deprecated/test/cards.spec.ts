const _ = require("lodash");
const expect = require("chai").expect;
let PPN = require("../lib/ppn");
let Card = require("../lib/card");
let Cards = require("../lib/cards");

let tmpCards = [];
_.forEach(_.values(PPN.all()), (ppn) => tmpCards.push(new Card(PPN.card(ppn))));
const FULL_DECK = Object.freeze(tmpCards);

const PPN_STRING = "123456789ABCDEFGHIJKLMNOPQRSTUVW";
const UNICODE_STRING = "7♠8♠9♠X♠J♠Q♠K♠A♠7♦8♦9♦X♦J♦Q♦K♦A♦7♥8♥9♥X♥J♥Q♥K♥A♥7♣8♣9♣X♣J♣Q♣K♣A♣";
const FULL_STRING = "7Spade8Spade9SpadeXSpadeJSpadeQSpadeKSpadeASpade7Diamond8Diamond9DiamondXDiamondJDiamondQDiamondKDiamondADiamond7Heart8Heart9HeartXHeartJHeartQHeartKHeartAHeart7Club8Club9ClubXClubJClubQClubKClubAClub";

describe("Cards tests", () => {
	it("Cards should exist", () => {
		expect(Cards).to.exist;
	});

	describe("Cards constructor/getters tests", () => {
		let cards = new Cards(FULL_DECK);
		it("contructor should create object", () => {
			expect(() => new Cards(FULL_DECK)).to.not.throw();
			expect(cards).to.be.a("object");
		});
		it("Cards all should return array", () => {
			expect(cards.all()).to.be.an("array");
		});
		it("Cards all should return 32 cards", () => {
			expect(cards.all()).to.have.lengthOf(32);
		});
		it("Cards getPPN should equal to " + PPN_STRING, () => {
			expect(cards.getPPN()).to.be.equal(PPN_STRING);
		});
		it("Cards toString should equal to " + FULL_STRING, () => {
			expect(cards.toString()).to.be.equal(FULL_STRING);
		});
		it("Cards toUnicodeString should equal to " + UNICODE_STRING, () => {
			expect(cards.toUnicodeString()).to.be.equal(UNICODE_STRING);
		});
	});

	describe("Cards original tests", () => {
		let cards = new Cards(FULL_DECK);
		let original = cards.getOriginal();
		it("Cards original should be an array", () => {
			expect(original).to.be.an("array");
		});
		it("Cards original should return 32 cards", () => {
			expect(original).to.have.lengthOf(32);
		});
		it("Cards getOriginalPPN should equal to " + PPN_STRING, () => {
			expect(cards.getOriginalPPN()).to.be.equal(PPN_STRING);
		});
		it("Cards toOriginalString should equal to " + FULL_STRING, () => {
			expect(cards.toOriginalString()).to.be.equal(FULL_STRING);
		});
		it("Cards toOriginalUnicodeString should equal to " + UNICODE_STRING, () => {
			expect(cards.toOriginalUnicodeString()).to.be.equal(UNICODE_STRING);
		});
	});

});
