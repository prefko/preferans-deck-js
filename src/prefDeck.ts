#!/usr/bin/env node
"use strict";

import * as _ from "lodash";
import PrefDeckPile from "./prefDeckPile";
import {PrefDeckCardSuit, PrefDeckCardValue} from "./prefDeckCard";
import PrefDeckCard from "./prefDeckCard";

const createControlDeck = (): PrefDeckCard[] => {
	let tmpCards: PrefDeckCard[] = [];
	let tmpSuits = [PrefDeckCardSuit.SPADE, PrefDeckCardSuit.DIAMOND, PrefDeckCardSuit.HEART, PrefDeckCardSuit.CLUB];
	let tmpValues = [PrefDeckCardValue.SEVEN, PrefDeckCardValue.EIGHT, PrefDeckCardValue.NINE, PrefDeckCardValue.TEN,
		PrefDeckCardValue.JACK, PrefDeckCardValue.QUEEN, PrefDeckCardValue.KING, PrefDeckCardValue.ACE];
	_.forEach(tmpSuits, (suit) => {
		_.forEach(tmpValues, (value) => {
			tmpCards.push(new PrefDeckCard(suit, value));
		});
	});
	return tmpCards;
};

const createWeightedCuts = (): number[] => {
	let tmpCuts = [2, 3], i, j;
	for (i = 0; i < 2; i++) for (j = 4; j <= 6; j++) tmpCuts.push(j);
	for (i = 0; i < 5; i++) for (j = 7; j <= 10; j++) tmpCuts.push(j);
	for (i = 0; i < 8; i++) for (j = 11; j <= 15; j++) tmpCuts.push(j);
	return _.sortBy(_.concat(tmpCuts, _.map(tmpCuts, (t) => 31 - t)));
};

const CONTROL_DECK: PrefDeckCard[] = createControlDeck();
const WEIGHTED_CUTS: number[] = createWeightedCuts();

const weighted123 = (): 1 | 2 | 3 => {
	let cnt = _.random(1, 25);
	return cnt <= 20 ? 1 : (cnt <= 24 ? 2 : 3);
};

const containsAll = (a: PrefDeckCard[], b: PrefDeckCard[]): boolean => {
	let c = true;
	_.forEach(a, (i) => c = _.includes(b, i));
	return c;
};
const sameCards = (a: PrefDeckCard[], b: PrefDeckCard[]): boolean => {
	return a.length === b.length && (a === b || (containsAll(a, b) && containsAll(b, a)));
};

const isValidDeck = (cards: PrefDeckCard[]): boolean => sameCards(cards, CONTROL_DECK);
const randomRange = (): number[] => _.range(0, _.random(1, 3));
const weightedRange = (): number[] => _.range(0, weighted123());

const shuffleHuman = (cards: PrefDeckCard[]): PrefDeckCard[] => {
	let left: PrefDeckCard[] = cards.splice(0, _.sample(WEIGHTED_CUTS));
	let right: PrefDeckCard[] = _.clone(cards);

	cards = [];
	while (!_.isEmpty(_.concat(left, right))) {
		cards = _.isEmpty(left) ? cards : cards.concat(left.splice(0, weighted123()));
		cards = _.isEmpty(right) ? cards : cards.concat(right.splice(0, weighted123()));
	}
	return cards;
};

const shuffleSimple = (cards: PrefDeckCard[]): PrefDeckCard[] => {
	let left: PrefDeckCard[] = cards.splice(0, _.random(1, 9));
	let right: PrefDeckCard[] = _.clone(cards);
	let front = true;

	cards = left;
	while (!_.isEmpty(right)) {
		let cut = _.min([_.random(1, 9), _.size(right)]);
		let swap1 = right.splice(0, cut);

		cards = front ? swap1.concat(cards) : cards.concat(swap1);
		front = !front;
	}
	return cards;
};

export default class PrefDeck extends PrefDeckPile {
	constructor() {
		super(CONTROL_DECK);
		return this;
	}

	static validate(cards: PrefDeckCard[]) {
		return isValidDeck(cards);
	}

	isValid() {
		return isValidDeck(this.cards);
	}

	restore(cards: PrefDeckCard[]) {
		if (!isValidDeck(cards)) throw new Error("Deck::restore:Invalid cards to restore from: " + cards);
		this._cards = _.clone(cards);
		return this;
	}

	cut() {
		this._cards = this._cards.concat(this._cards.splice(0, _.sample(WEIGHTED_CUTS)));
		return this;
	}

	shuffle() {
		_.forEach(randomRange(), () => this._cards = shuffleHuman(this._cards));
		_.forEach(weightedRange(), () => this._cards = shuffleSimple(this._cards));
		this.cut();
		return this;
	}

	deal() {
		let h1a = _.slice(this._cards, 0, 5);
		let h2a = _.slice(this._cards, 5, 10);
		let h3a = _.slice(this._cards, 10, 15);
		let t = _.slice(this._cards, 15, 17);
		let h1b = _.slice(this._cards, 17, 22);
		let h2b = _.slice(this._cards, 22, 27);
		let h3b = _.slice(this._cards, 27, 32);

		return {
			h1: new PrefDeckPile(_.concat(h1a, h1b)),
			h2: new PrefDeckPile(_.concat(h2a, h2b)),
			h3: new PrefDeckPile(_.concat(h3a, h3b)),
			t: new PrefDeckPile(t)
		};
	}
}
