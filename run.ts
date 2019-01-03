#!/usr/bin/env node
"use strict";

import * as _ from "lodash";
import {PrefDeckCardSuit, PrefDeckCardValue} from "./src/prefDeckCard";
import PrefDeckCard from "./src/prefDeckCard";

let tmpCards: PrefDeckCard[] = [];
let tmpSuits = [PrefDeckCardSuit.SPADE, PrefDeckCardSuit.DIAMOND, PrefDeckCardSuit.HEART, PrefDeckCardSuit.CLUB];
let tmpValues = [PrefDeckCardValue.SEVEN, PrefDeckCardValue.EIGHT, PrefDeckCardValue.NINE, PrefDeckCardValue.TEN,
	PrefDeckCardValue.JACK, PrefDeckCardValue.QUEEN, PrefDeckCardValue.KING, PrefDeckCardValue.ACE];
_.forEach(tmpSuits, (suit) => {
	_.forEach(tmpValues, (value) => {
		if (suit && value) tmpCards.push(new PrefDeckCard(suit, value));
	});
});
console.log(_.join(_.map(tmpCards, c => c.label), '\n'));