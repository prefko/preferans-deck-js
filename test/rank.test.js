const _ = require('lodash');
const expect = require('chai').expect;

const Rank = require('../lib/help/rank');
const __ranks = Object.freeze({'7': 7, '8': 8, '9': 9, 'x': 10, 'j': 12, 'q': 13, 'k': 14, 'a': 15});
const badValues = Object.freeze([1, 2, 3, 4, 5, 6, 11, 16, 'z', 'Z']);
const goodValues = Object.freeze([7, 8, 9, 'x', 'X', 'j', 'J', 'q', 'Q', 'k', 'K', 'a', 'A']);

describe('Rank tests', function () {
	it('Rank should exist', function () {
		expect(Rank).to.exist;
	});

	it('Rank.rank should exist', function () {
		expect(Rank.rank).to.exist;
	});

	it('Rank.isValid should exist', function () {
		expect(Rank.isValid).to.exist;
	});

	it('Rank.all should exist', function () {
		expect(Rank.all).to.exist;
	});

	describe('Get rank tests', function () {
		_.forEach(__ranks, (rank, value) => {
			it(value + ' Rank.rank should return ' + rank, function () {
				expect(Rank.rank(value)).to.be.equal(rank);
			});
		});
	});

	describe('Get rank tests should fail', function () {
		_.forEach(badValues, value => {
			it(value + ' Rank.rank should fail', function () {
				expect(Rank.rank(value)).to.be.undefined;
			});
		});
	});

	describe('isValid value tests should be valid', function () {
		_.forEach(goodValues, value => {
			if (_.isInteger(value)) {
				it('Integer ' + value + ' should be valid', function () {
					expect(Rank.isValid(value)).to.be.true;
				});
				value = '' + value;
			}
			it('String |' + value + '| should be valid', function () {
				expect(Rank.isValid(value)).to.be.true;
			});
		});
	});

	describe('isValid value tests should not be valid', function () {
		_.forEach(badValues, value => {
			it(value + ' should not be valid', function () {
				expect(Rank.isValid(value)).to.be.false;
			});
		});
	});

	describe('test method all', function () {
		it('should be a non-empty array', function () {
			expect(Rank.all()).to.be.an('array').that.is.not.empty;
		});
	});

	describe('should have exact values', function () {
		let check = _.uniq(_.values(__ranks));
		let vals = _.join(check, ',');
		it('response should include all values: ' + vals, function () {
			expect(Rank.all()).to.include.members(check);
		});
		it(vals + ' should include all from response', function () {
			expect(check).to.include.members(Rank.all());
		});
	});

});
