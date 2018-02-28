const _ = require('lodash');
const expect = require('chai').expect;

const PPN = require('../lib/help/ppn');
const __ppns = Object.freeze({
	'7spade': '1',
	'8spade': '2',
	'9spade': '3',
	'xspade': '4',
	'jspade': '5',
	'qspade': '6',
	'kspade': '7',
	'aspade': '8',

	'7diamond': '9',
	'8diamond': 'A',
	'9diamond': 'B',
	'xdiamond': 'C',
	'jdiamond': 'D',
	'qdiamond': 'E',
	'kdiamond': 'F',
	'adiamond': 'G',

	'7heart': 'H',
	'8heart': 'I',
	'9heart': 'J',
	'xheart': 'K',
	'jheart': 'L',
	'qheart': 'M',
	'kheart': 'N',
	'aheart': 'O',

	'7club': 'P',
	'8club': 'Q',
	'9club': 'R',
	'xclub': 'S',
	'jclub': 'T',
	'qclub': 'U',
	'kclub': 'V',
	'aclub': 'W'
});
const make = key => ({value: _.first(key), suit: _.join(_.drop(key), '')});
const __cards = Object.freeze(_.transform(__ppns, (result, value, key) => result[value] = make(key), {}));
const badLabels = Object.freeze([1, 2, 3, 4, 5, 6, 11, 16, 'z', 'Z']);

describe('PPN tests', function () {
	it('PPN should exist', function () {
		expect(PPN).to.exist;
	});

	it('PPN.get should exist', function () {
		expect(PPN.get).to.exist;
	});

	it('PPN.all should exist', function () {
		expect(PPN.all).to.exist;
	});

	it('PPN.card should exist', function () {
		expect(PPN.card).to.exist;
	});

	describe('Get ppn tests', function () {
		_.forEach(__ppns, (ppn, label) => {
			it(label + ' PPN.get should return ' + ppn, function () {
				expect(PPN.get(label)).to.be.equal(ppn);
			});
		});
	});

	describe('Get ppn tests should fail', function () {
		_.forEach(badLabels, label => {
			it(label + ' PPN.get should fail', function () {
				expect(PPN.get(label)).to.be.undefined;
			});
		});
	});

	describe('test method all', function () {
		it('should be a non-empty array', function () {
			expect(PPN.all()).to.be.an('array').that.is.not.empty;
		});
	});

	describe('should have exact values', function () {
		let check = _.uniq(_.values(__ppns));
		let vals = _.join(check, ',');
		it('response should include all values: ' + vals, function () {
			expect(PPN.all()).to.include.members(check);
		});
		it(vals + ' should include all from response', function () {
			expect(check).to.include.members(PPN.all());
		});
	});

	describe('card ppn tests', function () {
		_.forEach(__cards, (card, ppn) => {
			it(ppn + ' PPN.card should return ' + JSON.stringify(card), function () {
				expect(PPN.card(ppn)).to.be.deep.equal(card);
			});
		});
	});

});
