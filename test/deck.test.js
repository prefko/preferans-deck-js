const _ = require('lodash');
const expect = require("chai").expect;

const Deck = require("../lib/deck");

describe("Deck tests", function () {
	it('Deck should exist', function () {
		expect(Deck).to.exist;
	});

});
