import {expect} from 'chai';
import * as _ from "lodash";
import PrefDeck from "../src/prefDeck";

const ppnString = "123456789ABCDEFGHIJKLMNOPQRSTUVW";
const unicodeString = "7♠8♠9♠X♠J♠Q♠K♠A♠7♦8♦9♦X♦J♦Q♦K♦A♦7♥8♥9♥X♥J♥Q♥K♥A♥7♣8♣9♣X♣J♣Q♣K♣A♣";
const fullString = "7Spade8Spade9SpadeXSpadeJSpadeQSpadeKSpadeASpade7Diamond8Diamond9DiamondXDiamondJDiamondQDiamondKDiamondADiamond7Heart8Heart9HeartXHeartJHeartQHeartKHeartAHeart7Club8Club9ClubXClubJClubQClubKClubAClub";

describe("PrefDeck tests", () => {
	describe("PrefDeck constructor/getters tests", () => {
		it("contructor should create object", () => {
			expect(() => new PrefDeck()).to.not.throw();
			expect(new PrefDeck()).to.be.an("object");
		});
		it("PrefDeck ppn should equal to " + ppnString, () => {
			expect(new PrefDeck().ppn).to.be.equal(ppnString);
		});
		it("PrefDeck label should equal to " + fullString, () => {
			expect(new PrefDeck().label).to.be.equal(fullString);
		});
		it("PrefDeck unicode should equal to " + unicodeString, () => {
			expect(new PrefDeck().unicode).to.be.equal(unicodeString);
		});
		it("PrefDeck cards should return array", () => {
			expect(new PrefDeck().cards).to.be.an("array");
		});
		it("PrefDeck cards should return 32 cards", () => {
			expect(new PrefDeck().cards).to.have.lengthOf(32);
		});
	});

	describe("PrefDeck validate tests", () => {
		it("PrefDeck validate for all should return true", () => {
			expect(PrefDeck.validate(new PrefDeck().cards)).to.be.equal(true);
		});
		it("PrefDeck validate should return false", () => {
			expect(PrefDeck.validate([])).to.be.equal(false);
		});
	});

	describe("PrefDeck isValid tests", () => {
		it("PrefDeck valid should return true", () => {
			expect(new PrefDeck().valid).to.be.equal(true);
		});
	});

	describe("PrefDeck cut tests", () => {
		let deck = new PrefDeck();
		deck = deck.cut;
		it("PrefDeck cut should return object", () => {
			expect(deck).to.be.an("object");
		});
		it("PrefDeck cut should not equal to " + ppnString, () => {
			expect(deck.ppn).to.be.not.equal(ppnString);
		});
		it("PrefDeck cut should return array of length 32", () => {
			expect(deck.cards).to.be.an("array");
			expect(deck.cards).to.have.lengthOf(32);
		});
	});

	describe("PrefDeck cut stress test", () => {
		const deck = new PrefDeck();
		_.forEach(_.times(1000), (): PrefDeck => deck.cut);
		it("PrefDeck 1000 cuts should return array of length 32", () => {
			expect(deck.cards).to.be.an("array");
			expect(deck.cards).to.have.lengthOf(32);
		});
	});

	describe("PrefDeck shuffle tests", () => {
		const deck = new PrefDeck();
		let shuffle = deck.shuffle;
		it("PrefDeck shuffle should return object", () => {
			expect(shuffle).to.be.an("object");
		});
		it("PrefDeck shuffle should not equal to " + ppnString, () => {
			expect(shuffle.ppn).to.be.not.equal(ppnString);
		});
		it("PrefDeck shuffle should return array of length 32", () => {
			expect(shuffle.cards).to.be.an("array");
			expect(shuffle.cards).to.have.lengthOf(32);
		});
		_.forEach(_.times(1000), (): PrefDeck => shuffle = deck.shuffle);
		it("PrefDeck 1000 shuffles should return array of length 32", () => {
			expect(shuffle.cards).to.be.an("array");
			expect(shuffle.cards).to.have.lengthOf(32);
		});
	});

	describe("PrefDeck deal tests", () => {
		const deal = new PrefDeck().deal;
		it("PrefDeck deal should return object", () => {
			expect(deal).to.be.an("object");
		});
		it("PrefDeck cut should not equal to " + ppnString, () => {
			expect(deal.h1).to.be.an("object");
			expect(deal.h1.cards).to.be.an("array");
			expect(deal.h1.cards).to.have.lengthOf(10);
			expect(deal.h2).to.be.an("object");
			expect(deal.h2.cards).to.be.an("array");
			expect(deal.h2.cards).to.have.lengthOf(10);
			expect(deal.h3).to.be.an("object");
			expect(deal.h3.cards).to.be.an("array");
			expect(deal.h3.cards).to.have.lengthOf(10);
			expect(deal.t).to.be.an("object");
			expect(deal.t.cards).to.be.an("array");
			expect(deal.t.cards).to.have.lengthOf(2);
		});
	});

	describe("PrefDeck restore tests", () => {
		const deck = new PrefDeck();
		const deal = deck.deal;
		const deck2 = new PrefDeck();
		const deck3 = new PrefDeck();
		const cutted = deck2.cut.cards;
		const shuffled = deck3.shuffle.cards;
		it("PrefDeck restore for cards should not throw", () => {
			expect(() => deck.restore(deck.cards)).to.not.throw();
			expect(deck.cards).to.have.lengthOf(32);
			expect(deck2.cards).to.have.lengthOf(32);
			expect(deck3.cards).to.have.lengthOf(32);
			expect(cutted).to.have.lengthOf(32);
			expect(shuffled).to.have.lengthOf(32);
			expect(() => deck.restore(deck2.cards)).to.not.throw();
			expect(deck.restore(deck2.cards)).to.be.an("object");
			expect(() => (deck.restore(cutted))).to.not.throw();
			expect(deck.restore(cutted)).to.be.an("object");
			expect(() => deck.restore(shuffled)).to.not.throw();
			expect(deck.restore(shuffled)).to.be.an("object");
		});
		it("PrefDeck restore for cards should throw", () => {
			expect(() => deck.restore([])).to.throw();
			expect(() => deck.restore(deal.h1.cards)).to.throw();
		});
		it("PrefDeck validate should return false", () => {
			expect(PrefDeck.validate([])).to.be.equal(false);
		});
	});

});
