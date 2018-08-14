const _ = require("lodash");
const expect = require("chai").expect;

const Suit = require("../lib/suit");

const __suits = Object.freeze({
	spade: "spade", s: "spade", "♠": "spade",
	diamond: "diamond", d: "diamond", "♦": "diamond",
	heart: "heart", h: "heart", "♥": "heart",
	club: "club", c: "club", "♣": "club"
});
const badSuits = Object.freeze([1, 2, 3, 4, 5, 6, 11, 16, "z", "Z"]);
const goodSuits = Object.freeze([
	"spade", "s", "♠",
	"diamond", "d", "♦",
	"heart", "h", "♥",
	"club", "c", "♣"
]);
const goodUnicodes = Object.freeze({spade: "♠", diamond: "♦", heart: "♥", club: "♣"});

describe("Suit tests", function () {
	it("Suit should exist", function () {
		expect(Suit).to.exist;
	});

	it("Suit.suit should exist", function () {
		expect(Suit.suit).to.exist;
	});

	it("Suit.isValid should exist", function () {
		expect(Suit.isValid).to.exist;
	});

	it("Suit.toUnicode should exist", function () {
		expect(Suit.toUnicode).to.exist;
	});

	it("Suit.all should exist", function () {
		expect(Suit.all).to.exist;
	});

	describe("Get suit tests", function () {
		_.forEach(__suits, (suit, suitLabel) => {
			it(suitLabel + " Suit.suit should return " + suit, function () {
				expect(Suit.suit(suitLabel)).to.be.equal(suit);
			});
		});
	});

	describe("isValid suit tests should be valid", function () {
		_.forEach(goodSuits, (value) => {
			if (_.isInteger(value)) {
				it("Integer " + value + " should be valid", function () {
					expect(Suit.isValid(value)).to.be.true;
				});
				value = "" + value;
			}
			it("String |" + value + "| should be valid", function () {
				expect(Suit.isValid(value)).to.be.true;
			});
		});
	});

	describe("isValid suit tests should not be valid", function () {
		_.forEach(badSuits,(value) => {
			it(value + " should not be valid", function () {
				expect(Suit.isValid(value)).to.be.false;
			});
		});
	});

	describe("toUnicode suit tests should pass", function () {
		_.forEach(goodUnicodes, (unicode, suit) => {
			it(suit + " Suit.toUnicode should return " + unicode, function () {
				expect(Suit.toUnicode(suit)).to.be.equal(unicode);
			});
		});
	});

	describe("toUnicode suit tests should fail", function () {
		_.forEach(badSuits, (suit) => {
			it(suit + " should be undefined", function () {
				expect(Suit.toUnicode(suit)).to.be.undefined;
			});
		});
	});

	describe("test method all", function () {
		it("should be a non-empty array", function () {
			expect(Suit.all()).to.be.an("array").that.is.not.empty;
		});
	});

	describe("should have exact values", function () {
		let vals = _.join(_.keys(goodUnicodes), ",");
		it("response should include all values: " + vals, function () {
			expect(Suit.all()).to.include.members(_.keys(goodUnicodes));
		});
		it(vals + " should include all from response", function () {
			expect(_.keys(goodUnicodes)).to.include.members(Suit.all());
		});
	});

});
