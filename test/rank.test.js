const _ = require('lodash');
const expect = require("chai").expect;

const Rank = require("../lib/rank");
const __ranks = Object.freeze({'7': 7, '8': 8, '9': 9, 'x': 10, 'j': 12, 'q': 13, 'k': 14, 'a': 15});
const badValues = Object.freeze([1, 2, 3, 4, 5, 6, 11, 16, 'z', 'Z']);

describe("Rank tests", function () {
	it('Rank should exist', function () {
		expect(Rank).to.exist;
	});

	it('Rank.get should exist', function () {
		expect(Rank.get).to.exist;
	});

	describe("Get rank tests", function () {
		_.forEach(__ranks, (rank, value) => {
			it(value + ' Rank.get should return ' + rank, function () {
				expect(Rank.get(value)).to.be.equal(rank);
			});
		});
	});

	describe("Get rank tests should fail", function () {
		_.forEach(badValues, value => {
			it(value + ' Rank.get should fail', function () {
				expect(Rank.get(value)).to.be.undefined;
			});
		});
	});
});
