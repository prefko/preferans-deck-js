const _ = require("lodash");
const expect = require("chai").expect;

const Suit = require("../_deprecated/suit");

const __SUITS = Object.freeze({
	spade: "spade", s: "spade", "♠": "spade",
	diamond: "diamond", d: "diamond", "♦": "diamond",
	heart: "heart", h: "heart", "♥": "heart",
	club: "club", c: "club", "♣": "club"
});
const SUITS_BAD = Object.freeze([1, 2, 3, 4, 5, 6, 11, 16, "z", "Z"]);
const SUITS_GOOD = Object.freeze([
	"spade", "s", "♠",
	"diamond", "d", "♦",
	"heart", "h", "♥",
	"club", "c", "♣"
]);
const UNICODES_GOOD = Object.freeze({spade: "♠", diamond: "♦", heart: "♥", club: "♣"});

describe("Suit tests", () => {
	it("Suit should exist", () => {
		expect(Suit).to.exist;
	});

	it("Suit.suit should exist", () => {
		expect(Suit.suit).to.exist;
	});

	it("Suit.isValid should exist", () => {
		expect(Suit.isValid).to.exist;
	});

	it("Suit.toUnicode should exist", () => {
		expect(Suit.toUnicode).to.exist;
	});

	it("Suit.all should exist", () => {
		expect(Suit.all).to.exist;
	});

	describe("Get suit tests", () => {
		_.forEach(__SUITS, (suit, suitLabel) => {
			it(suitLabel + " Suit.suit should return " + suit, () => {
				expect(Suit.suit(suitLabel)).to.be.equal(suit);
			});
		});
	});

	describe("isValid suit tests should be valid", () => {
		_.forEach(SUITS_GOOD, (value) => {
			if (_.isInteger(value)) {
				it("Integer " + value + " should be valid", () => {
					expect(Suit.isValid(value)).to.be.true;
				});
				value = "" + value;
			}
			it("String |" + value + "| should be valid", () => {
				expect(Suit.isValid(value)).to.be.true;
			});
		});
	});

	describe("isValid suit tests should not be valid", () => {
		_.forEach(SUITS_BAD, (value) => {
			it(value + " should not be valid", () => {
				expect(Suit.isValid(value)).to.be.false;
			});
		});
	});

	describe("toUnicode suit tests should pass", () => {
		_.forEach(UNICODES_GOOD, (unicode, suit) => {
			it(suit + " Suit.toUnicode should return " + unicode, () => {
				expect(Suit.toUnicode(suit)).to.be.equal(unicode);
			});
		});
	});

	describe("toUnicode suit tests should fail", () => {
		_.forEach(SUITS_BAD, (suit) => {
			it(suit + " should be undefined", () => {
				expect(Suit.toUnicode(suit)).to.be.undefined;
			});
		});
	});

	describe("test method all", () => {
		it("should be a non-empty array", () => {
			expect(Suit.all()).to.be.an("array").that.is.not.empty;
		});
	});

	describe("should have exact values", () => {
		let vals = _.join(_.keys(UNICODES_GOOD), ",");
		it("response should include all values: " + vals, () => {
			expect(Suit.all()).to.include.members(_.keys(UNICODES_GOOD));
		});
		it(vals + " should include all from response", () => {
			expect(_.keys(UNICODES_GOOD)).to.include.members(Suit.all());
		});
	});

});
