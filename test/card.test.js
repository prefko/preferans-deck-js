const _ = require("lodash");
const expect = require("chai").expect;

let Card = require("../lib/card");
let __cards = [
	{
		card: new Card({value: 7, suit: "spade"}),
		string: "7Spade",
		unicode: "7♠",
		value: "7",
		suit: "spade",
		rank: 7,
		label: "7spade",
		ppn: "1"
	}, {
		card: new Card(8, "♦"),
		string: "8Diamond",
		unicode: "8♦",
		value: "8",
		suit: "diamond",
		rank: 8,
		label: "8diamond",
		ppn: "A"
	}, {
		card: new Card("X", "h"),
		string: "XHeart",
		unicode: "X♥",
		value: "X",
		suit: "heart",
		rank: 10,
		label: "xheart",
		ppn: "K"
	}, {
		card: new Card(12, "d"),
		string: "JDiamond",
		unicode: "J♦",
		value: "J",
		suit: "diamond",
		rank: 12,
		label: "jdiamond",
		ppn: "D"
	}, {
		card: new Card({value: "13", suit: "club"}),
		string: "QClub",
		unicode: "Q♣",
		value: "Q",
		suit: "club",
		rank: 13,
		label: "qclub",
		ppn: "U"
	}
];
const __ppns = Object.freeze(["1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W"]);

describe("Card tests", () => {
	it("Card should exist", () => {
		expect(Card).to.exist;
	});

	describe("Contructor PPN tests", () => {
		_.forEach(__ppns, (ppn) => {
			it("contructor should create card for " + ppn, () => {
				expect(() => new Card(ppn)).to.not.throw();
				expect(new Card(ppn)).to.be.a("object");
			});
		});
	});

	describe("Bad contructor tests", () => {
		let fails = [null, "5club", "Ahearts", {value: 16, suit: "♣"}];
		_.forEach(fails, (fail) => {
			it("contructor should fail for value=" + JSON.stringify(fail), () => {
				expect(() => new Card(fail)).to.throw();
			});
			it("contructor should fail for suit=" + JSON.stringify(fail), () => {
				expect(() => new Card("X", fail)).to.throw();
			});
		});
	});

	describe("Single card tests", () => {
		_.forEach(__cards, (card) => {
			it("should exist", () => {
				expect(card.card).to.exist;
			});
			it(card.string + " toString should return " + card.string, () => {
				expect(card.card.toString()).to.be.equal(card.string);
			});
			it(card.string + " toUnicodeString should return " + card.unicode, () => {
				expect(card.card.toUnicodeString()).to.be.equal(card.unicode);
			});
			it(card.string + " getValue should return " + card.value, () => {
				expect(card.card.getValue()).to.be.equal(card.value);
			});
			it(card.string + " getSuit should return " + card.suit, () => {
				expect(card.card.getSuit()).to.be.equal(card.suit);
			});
			it(card.string + " getRank should return " + card.rank, () => {
				expect(card.card.getRank()).to.be.equal(card.rank);
			});
			it(card.string + " getLabel should return " + card.label, () => {
				expect(card.card.getLabel()).to.be.equal(card.label);
			});
			it(card.string + " getPPN should return " + card.ppn, () => {
				expect(card.card.getPPN()).to.be.equal(card.ppn);
			});
		});
	});

	describe("Compare cards tests", () => {
		it("7Club should beat 8Heart", () => {
			let c1 = new Card("7", "c");
			let c2 = new Card("8", "h");
			expect(c1.beats(c2)).to.be.true;
			expect(Card.compare(c1, c2)).to.be.below(0);
			expect(Card.winner(c1, c2)).to.be.equal(c1);
		});
		it("7Club should not beat 8Club", () => {
			let c1 = new Card("7", "c");
			let c2 = new Card("8", "c");
			expect(c1.beats(c2)).to.be.false;
			expect(Card.compare(c1, c2)).to.be.above(0);
			expect(Card.winner(c1, c2)).to.be.equal(c2);
		});
		it("9Club should not beat 8Heart for trump h", () => {
			let c1 = new Card("9", "c");
			let c2 = new Card("8", "h");
			expect(c1.beats(c2, "h")).to.be.false;
			expect(Card.compare(c1, c2, "h")).to.be.above(0);
			expect(Card.winner(c1, c2, "h")).to.be.equal(c2);
		});
		it("9Club should not beat 8Heart for trump Heart", () => {
			let c1 = new Card("9", "c");
			let c2 = new Card("8", "h");
			expect(c1.beats(c2, "Heart")).to.be.false;
			expect(Card.compare(c1, c2, "Heart")).to.be.above(0);
			expect(Card.winner(c1, c2, "Heart")).to.be.equal(c2);
		});
		it("9Club should not beat 8Heart for trump ♥", () => {
			let c1 = new Card("9", "c");
			let c2 = new Card("8", "h");
			expect(c1.beats(c2, "♥")).to.be.false;
			expect(Card.compare(c1, c2, "♥")).to.be.above(0);
			expect(Card.winner(c1, c2, "♥")).to.be.equal(c2);
		});
		it("KClub should beat JClub for trump Club", () => {
			let c1 = new Card("K", "c");
			let c2 = new Card("J", "c");
			expect(c1.beats(c2, "Club")).to.be.true;
			expect(Card.compare(c1, c2, "Club")).to.be.below(0);
			expect(Card.winner(c1, c2, "Club")).to.be.equal(c1);
		});
		it("7Club should not beat 8Club for trump Club", () => {
			let c1 = new Card("7", "c");
			let c2 = new Card("8", "c");
			expect(c1.beats(c2, "Club")).to.be.false;
			expect(Card.compare(c1, c2, "Club")).to.be.above(0);
			expect(Card.winner(c1, c2, "Club")).to.be.equal(c2);
		});
	});
});
