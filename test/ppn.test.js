const _ = require("lodash");
const expect = require("chai").expect;

const PPN = require("../lib/ppn");
const __ppns = Object.freeze({
	"7spade": "1",
	"8spade": "2",
	"9spade": "3",
	"xspade": "4",
	"jspade": "5",
	"qspade": "6",
	"kspade": "7",
	"aspade": "8",

	"7diamond": "9",
	"8diamond": "A",
	"9diamond": "B",
	"xdiamond": "C",
	"jdiamond": "D",
	"qdiamond": "E",
	"kdiamond": "F",
	"adiamond": "G",

	"7heart": "H",
	"8heart": "I",
	"9heart": "J",
	"xheart": "K",
	"jheart": "L",
	"qheart": "M",
	"kheart": "N",
	"aheart": "O",

	"7club": "P",
	"8club": "Q",
	"9club": "R",
	"xclub": "S",
	"jclub": "T",
	"qclub": "U",
	"kclub": "V",
	"aclub": "W"
});
const make = (key) => ({value: _.first(key), suit: _.join(_.drop(key), "")});
const __cards = Object.freeze(_.transform(__ppns, (result, value, key) => _.set(result, value, make(key)), {}));
const badLabels = Object.freeze([1, 2, 3, 4, 5, 6, 11, 16, "z", "Z"]);

describe("PPN tests", () => {
	it("PPN should exist", () => {
		expect(PPN).to.exist;
	});

	it("PPN.all should exist", () => {
		expect(PPN.all).to.exist;
	});

	it("PPN.ppn should exist", () => {
		expect(PPN.ppn).to.exist;
	});

	it("PPN.ppns should exist", () => {
		expect(PPN.ppns).to.exist;
	});

	it("PPN.card should exist", () => {
		expect(PPN.card).to.exist;
	});

	it("PPN.cards should exist", () => {
		expect(PPN.cards).to.exist;
	});

	describe("test method all", () => {
		it("should be a non-empty array", () => {
			expect(PPN.all()).to.be.an("array").that.is.not.empty;
		});
	});

	describe("Get ppn tests", () => {
		_.forEach(__ppns, (ppn, label) => {
			it(label + " PPN.ppn should return " + ppn, () => {
				expect(PPN.ppn(label)).to.be.equal(ppn);
			});
		});
	});

	describe("Get ppn tests should fail", () => {
		_.forEach(badLabels, (label) => {
			it(label + " PPN.ppn should fail", () => {
				expect(PPN.ppn(label)).to.be.undefined;
			});
		});
	});

	describe("Get ppns tests", () => {
		it("PPN.ppns should return " + JSON.stringify(_.values(__ppns)), () => {
			expect(PPN.ppns(_.keys(__ppns))).to.deep.equal(_.values(__ppns));
		});
	});

	describe("should have exact values", () => {
		let check = _.uniq(_.values(__ppns));
		let vals = _.join(check, ",");
		it("response should include all values: " + vals, () => {
			expect(PPN.all()).to.include.members(check);
		});
		it(vals + " should include all from response", () => {
			expect(check).to.include.members(PPN.all());
		});
	});

	describe("card ppn tests", () => {
		_.forEach(__cards, (card, ppn) => {
			it(ppn + " PPN.card should return " + JSON.stringify(card), () => {
				expect(PPN.card(ppn)).to.deep.equal(card);
			});
		});
	});

	describe("cards ppn tests", () => {
		it("PPN.cards should return " + JSON.stringify(_.values(__cards)), () => {
			expect(PPN.cards(_.values(__ppns))).to.deep.equal(_.values(__cards));
		});
	});

});
