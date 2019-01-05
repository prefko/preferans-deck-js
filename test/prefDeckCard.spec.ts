import {expect} from 'chai';
import * as _ from "lodash";
import PrefDeckCard, {PrefDeckCardSuit, PrefDeckCardValue} from "../src/prefDeckCard";

const __cards = [
	{
		card: new PrefDeckCard(PrefDeckCardSuit.SPADE, PrefDeckCardValue.SEVEN),
		label: "7Spade",
		unicode: "7♠",
		value: PrefDeckCardValue.SEVEN,
		suit: PrefDeckCardSuit.SPADE,
		rank: 7,
		ppn: "1"
	}, {
		card: new PrefDeckCard(PrefDeckCardSuit.DIAMOND, PrefDeckCardValue.EIGHT),
		label: "8Diamond",
		unicode: "8♦",
		value: PrefDeckCardValue.EIGHT,
		suit: PrefDeckCardSuit.DIAMOND,
		rank: 8,
		ppn: "A"
	}, {
		card: new PrefDeckCard(PrefDeckCardSuit.HEART, PrefDeckCardValue.TEN),
		label: "XHeart",
		unicode: "X♥",
		value: PrefDeckCardValue.TEN,
		suit: PrefDeckCardSuit.HEART,
		rank: 10,
		ppn: "K"
	}, {
		card: new PrefDeckCard(PrefDeckCardSuit.DIAMOND, PrefDeckCardValue.JACK),
		label: "JDiamond",
		unicode: "J♦",
		value: PrefDeckCardValue.JACK,
		suit: PrefDeckCardSuit.DIAMOND,
		rank: 12,
		ppn: "D"
	}, {
		card: new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.QUEEN),
		label: "QClub",
		unicode: "Q♣",
		value: PrefDeckCardValue.QUEEN,
		suit: PrefDeckCardSuit.CLUB,
		rank: 13,
		ppn: "U"
	}
];
const __PPNS = Object.freeze(["1", "2", "3", "4", "5", "6", "7", "8", "9",
	"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O",
	"P", "Q", "R", "S", "T", "U", "V", "W"]);

describe("PrefDeckCard tests", () => {

	describe("PrefDeckCard constructor tests", () => {
		it("constructor should create card", () => {
			expect(() => new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.QUEEN)).to.not.throw();
			expect(new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.QUEEN)).to.be.an("object");
		});
	});

	describe("Basic ppnToCard tests", () => {
		_.forEach(__PPNS, (ppn) => {
			it("ppnToCard should create card for " + ppn, () => {
				expect(() => PrefDeckCard.ppnToCard("-")).to.throw();
				expect(() => PrefDeckCard.ppnToCard("Z")).to.throw();
				expect(() => PrefDeckCard.ppnToCard(ppn)).to.not.throw();
				expect(PrefDeckCard.ppnToCard(ppn)).to.be.an("object");
			});
		});
	});

	describe("Single card tests", () => {
		_.forEach(__cards, (card) => {
			it("should exist", () => {
				expect(card.card).to.be.an("object");
			});
			it(card.label + " label should return " + card.label, () => {
				expect(card.card.label).to.equal(card.label);
			});
			it(card.label + " toUnicodeString should return " + card.unicode, () => {
				expect(card.card.unicode).to.equal(card.unicode);
			});
			it(card.label + " getValue should return " + card.value, () => {
				expect(card.card.value).to.equal(card.value);
			});
			it(card.label + " getSuit should return " + card.suit, () => {
				expect(card.card.suit).to.equal(card.suit);
			});
			it(card.label + " getRank should return " + card.rank, () => {
				expect(card.card.rank).to.equal(card.rank);
			});
			it(card.label + " getLabel should return " + card.label, () => {
				expect(card.card.label).to.equal(card.label);
			});
			it(card.label + " getPPN should return " + card.ppn, () => {
				expect(card.card.ppn).to.equal(card.ppn);
			});
		});
	});

	describe("Compare cards tests", () => {
		it("7Club should equal 7Club", () => {
			const c1 = new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.SEVEN);
			const c2 = new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.SEVEN);
			expect(c1.beats(c2)).to.equal(false);
			expect(PrefDeckCard.compare(c1, c2)).to.equal(0);
			expect(PrefDeckCard.winner(c1, c2)).to.deep.equal(c1);
		});
		it("7Club should beat 8Heart", () => {
			const c1 = new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.SEVEN);
			const c2 = new PrefDeckCard(PrefDeckCardSuit.HEART, PrefDeckCardValue.EIGHT);
			expect(c1.beats(c2)).to.equal(true);
			expect(PrefDeckCard.compare(c1, c2)).to.equal(-1);
			expect(PrefDeckCard.winner(c1, c2)).to.deep.equal(c1);
		});
		it("7Club should not beat 8Club", () => {
			const c1 = new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.SEVEN);
			const c2 = new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.EIGHT);
			expect(c1.beats(c2)).to.equal(false);
			expect(PrefDeckCard.compare(c1, c2)).to.equal(1);
			expect(PrefDeckCard.winner(c1, c2)).to.deep.equal(c2);
		});
		it("9Club should not beat 8Heart for trump h", () => {
			const c1 = new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.NINE);
			const c2 = new PrefDeckCard(PrefDeckCardSuit.HEART, PrefDeckCardValue.EIGHT);
			expect(c1.beats(c2, PrefDeckCardSuit.HEART)).to.equal(false);
			expect(PrefDeckCard.compare(c1, c2, PrefDeckCardSuit.HEART)).to.equal(1);
			expect(PrefDeckCard.winner(c1, c2, PrefDeckCardSuit.HEART)).to.deep.equal(c2);
		});
		it("9Club should not beat 8Heart for trump Heart", () => {
			const c1 = new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.NINE);
			const c2 = new PrefDeckCard(PrefDeckCardSuit.HEART, PrefDeckCardValue.EIGHT);
			expect(c1.beats(c2, PrefDeckCardSuit.HEART)).to.equal(false);
			expect(PrefDeckCard.compare(c1, c2, PrefDeckCardSuit.HEART)).to.equal(1);
			expect(PrefDeckCard.winner(c1, c2, PrefDeckCardSuit.HEART)).to.deep.equal(c2);
		});
		it("9Club should not beat 8Heart for trump ♥", () => {
			const c1 = new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.NINE);
			const c2 = new PrefDeckCard(PrefDeckCardSuit.HEART, PrefDeckCardValue.EIGHT);
			expect(c1.beats(c2, PrefDeckCardSuit.HEART)).to.equal(false);
			expect(PrefDeckCard.compare(c1, c2, PrefDeckCardSuit.HEART)).to.equal(1);
			expect(PrefDeckCard.winner(c1, c2, PrefDeckCardSuit.HEART)).to.deep.equal(c2);
		});
		it("KClub should beat JClub for trump Club", () => {
			const c1 = new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.KING);
			const c2 = new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.JACK);
			expect(c1.beats(c2, PrefDeckCardSuit.CLUB)).to.equal(true);
			expect(PrefDeckCard.compare(c1, c2, PrefDeckCardSuit.CLUB)).to.equal(-1);
			expect(PrefDeckCard.winner(c1, c2, PrefDeckCardSuit.CLUB)).to.deep.equal(c1);
		});
		it("7Club should not beat 8Club for trump Club", () => {
			const c1 = new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.SEVEN);
			const c2 = new PrefDeckCard(PrefDeckCardSuit.CLUB, PrefDeckCardValue.EIGHT);
			expect(c1.beats(c2, PrefDeckCardSuit.CLUB)).to.equal(false);
			expect(PrefDeckCard.compare(c1, c2, PrefDeckCardSuit.CLUB)).to.equal(1);
			expect(PrefDeckCard.winner(c1, c2, PrefDeckCardSuit.CLUB)).to.deep.equal(c2);
		});
	});
})
;
