const expect = require("chai").expect;

let Card = require("../card");

describe("Card test", function () {
	it('should exist', function () {
		expect(Card).to.exist;
	});
});