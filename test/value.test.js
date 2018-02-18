const _ = require('lodash');
const expect = require("chai").expect;

const Value = require("../lib/help/value");
const __values = Object.freeze({'7': '7', '8': '8', '9': '9', 'x': 'X', '10': 'X', 'j': 'J', '12': 'J', 'q': 'Q', '13': 'Q', 'k': 'K', '14': 'K', 'a': 'A', '15': 'A'});
const badValues = Object.freeze([1, 2, 3, 4, 5, 6, 11, 16, 'z', 'Z']);
const goodValues = Object.freeze([7, 8, 9, 10, 12, 13, 14, 15, 'x', 'X', 'j', 'J', 'q', 'Q', 'k', 'K', 'a', 'A']);

describe("Value tests", function () {
	it('Value should exist', function () {
		expect(Value).to.exist;
	});

	it('Value.get should exist', function () {
		expect(Value.get).to.exist;
	});

	it('Value.isValid should exist', function () {
		expect(Value.isValid).to.exist;
	});

	describe("Get value tests", function () {
		_.forEach(__values, (value, valueLabel) => {
			it(valueLabel + ' Value.get should return ' + value, function () {
				expect(Value.get(valueLabel)).to.be.equal(value);
			});
		});
	});

	describe("isValid value tests should be valid", function () {
		_.forEach(goodValues, value => {
			if (_.isInteger(value)) {
				it('Integer ' + value + ' should be valid', function () {
					expect(Value.isValid(value)).to.be.true;
				});
				value = '' + value;
			}
			it('String "' + value + '" should be valid', function () {
				expect(Value.isValid(value)).to.be.true;
			});
		});
	});

	describe("isValid value tests should not be valid", function () {
		_.forEach(badValues, value => {
			it(value + ' should not be valid', function () {
				expect(Value.isValid(value)).to.be.false;
			});
		});
	});

	describe("test method all", function () {
		it('should be a non-empty array', function () {
			expect(Value.all()).to.be.an('array').that.is.not.empty;
		});
	});

	describe("should have exact values", function () {
		let check = _.uniq(_.values(__values));
		let vals = _.join(check, ',');
		it('response should include all values: ' + vals, function () {
			expect(Value.all()).to.include.members(check);
		});
		it(vals + ' should include all from response', function () {
			expect(check).to.include.members(Value.all());
		});
	});

});
