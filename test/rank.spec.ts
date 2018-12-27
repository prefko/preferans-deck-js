const _ = require("lodash");
const expect = require("chai").expect;

const Rank = require("../_deprecated/rank");
const __RANKS = Object.freeze({"7": 7, "8": 8, "9": 9, "x": 10, "j": 12, "q": 13, "k": 14, "a": 15});
const VALUES_BAD = Object.freeze([1, 2, 3, 4, 5, 6, 11, 16, "z", "Z"]);
const VALUES_GOOD = Object.freeze([7, 8, 9, "x", "X", "j", "J", "q", "Q", "k", "K", "a", "A"]);

describe("Rank tests", () => {
	it("Rank should exist", () => {
		expect(Rank).to.exist;
	});

	it("Rank.rank should exist", () => {
		expect(Rank.rank).to.exist;
	});

	it("Rank.isValid should exist", () => {
		expect(Rank.isValid).to.exist;
	});

	it("Rank.all should exist", () => {
		expect(Rank.all).to.exist;
	});

	describe("Get rank tests", () => {
		_.forEach(__RANKS, (rank, value) => {
			it(value + " Rank.rank should return " + rank, () => {
				expect(Rank.rank(value)).to.be.equal(rank);
			});
		});
	});

	describe("Get rank tests should fail", () => {
		_.forEach(VALUES_BAD, (value) => {
			it(value + " Rank.rank should fail", () => {
				expect(Rank.rank(value)).to.be.undefined;
			});
		});
	});

	describe("isValid value tests should be valid", () => {
		_.forEach(VALUES_GOOD, (value) => {
			if (_.isInteger(value)) {
				it("Integer " + value + " should be valid", () => {
					expect(Rank.isValid(value)).to.be.true;
				});
				value = "" + value;
			}
			it("String |" + value + "| should be valid", () => {
				expect(Rank.isValid(value)).to.be.true;
			});
		});
	});

	describe("isValid value tests should not be valid", () => {
		_.forEach(VALUES_BAD, (value) => {
			it(value + " should not be valid", () => {
				expect(Rank.isValid(value)).to.be.false;
			});
		});
	});

	describe("test method all", () => {
		it("should be a non-empty array", () => {
			expect(Rank.all()).to.be.an("array").that.is.not.empty;
		});
	});

	describe("should have exact values", () => {
		let check = _.uniq(_.values(__RANKS));
		let vals = _.join(check, ",");
		it("response should include all values: " + vals, () => {
			expect(Rank.all()).to.include.members(check);
		});
		it(vals + " should include all from response", () => {
			expect(check).to.include.members(Rank.all());
		});
	});

});
