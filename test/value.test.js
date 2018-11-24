const _ = require("lodash");
const expect = require("chai").expect;

const Value = require("../lib/value");
const __values = Object.freeze({"7": "7", "8": "8", "9": "9", "x": "X", "10": "X", "j": "J", "12": "J", "q": "Q", "13": "Q", "k": "K", "14": "K", "a": "A", "15": "A"});
const badValues = Object.freeze([1, 2, 3, 4, 5, 6, 11, 16, "z", "Z"]);
const goodValues = Object.freeze([7, 8, 9, 10, 12, 13, 14, 15, "x", "X", "j", "J", "q", "Q", "k", "K", "a", "A"]);

describe("Value tests", () => {
	it("Value should exist", () => {
		expect(Value).to.exist;
	});

	it("Value.value should exist", () => {
		expect(Value.value).to.exist;
	});

	it("Value.isValid should exist", () => {
		expect(Value.isValid).to.exist;
	});

	it("Value.all should exist", () => {
		expect(Value.all).to.exist;
	});

	describe("Get value tests", () => {
		_.forEach(__values, (value, valueLabel) => {
			it(valueLabel + " Value.value should return " + value, () => {
				expect(Value.value(valueLabel)).to.be.equal(value);
			});
		});
	});

	describe("isValid value tests should be valid", () => {
		_.forEach(goodValues, (value) => {
			if (_.isInteger(value)) {
				it("Integer " + value + " should be valid", () => {
					expect(Value.isValid(value)).to.be.true;
				});
				value = "" + value;
			}
			it("String |" + value + "| should be valid", () => {
				expect(Value.isValid(value)).to.be.true;
			});
		});
	});

	describe("isValid value tests should not be valid", () => {
		_.forEach(badValues, (value) => {
			it(value + " should not be valid", () => {
				expect(Value.isValid(value)).to.be.false;
			});
		});
	});

	describe("test method all", () => {
		it("should be a non-empty array", () => {
			expect(Value.all()).to.be.an("array").that.is.not.empty;
		});
	});

	describe("should have exact values", () => {
		let check = _.uniq(_.values(__values));
		let vals = _.join(check, ",");
		it("response should include all values: " + vals, () => {
			expect(Value.all()).to.include.members(check);
		});
		it(vals + " should include all from response", () => {
			expect(check).to.include.members(Value.all());
		});
	});

});
