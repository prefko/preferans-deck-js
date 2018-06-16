# preferans-deck-js
[![Build Status](https://travis-ci.org/cope/preferans-deck-js.svg?branch=master)](https://travis-ci.org/cope/preferans-deck-js)
[![coverage](https://coveralls.io/repos/github/cope/preferans-deck-js/badge.svg?branch=master)](https://coveralls.io/github/cope/preferans-deck-js?branch=master)
[![npm](https://img.shields.io/npm/dt/preferans-deck-js.svg)](https://www.npmjs.com/package/preferans-deck-js)

nodejs deck of cards for preferans

### Install
#### npm
    npm i preferans-deck-js
#### yarn
    yarn add preferans-deck-js

### Usage

    const Deck = require('preferans-deck-js');
    const Card = Deck.Card;

    let card = new Card('7');
    console.log(card.toUnicodeString());
    // K♠

    let deck = new Deck();
    let deal = deck.deal();
    console.log("Player 1:", deal.p1.toUnicodeString());
    console.log("Player 2:", deal.p2.toUnicodeString());
    console.log("Player 3:", deal.p3.toUnicodeString());
    console.log("Talon:", deal.t.toUnicodeString());

    // Player 1: 7♠8♠9♠X♠J♠8♥9♥X♥J♥Q♥
    // Player 2: Q♠K♠A♠7♦8♦K♥A♥7♣8♣9♣
    // Player 3: 9♦X♦J♦Q♦K♦X♣J♣Q♣K♣A♣
    // Talon: A♦7♥

### Labels and meaning

Mostly from [Wikipedia](https://en.wikipedia.org/wiki/Glossary_of_card_game_terms).

* card - duh
* deck - deck of 32 cards, from 7 to A in all 4 suits
* hand - cards in one players hands
* extra - two extra cards left over while dealing
* reject - two cards the main player rejected
* round - 3 hands and the extra 2 cards
* trump - the trump suit per round
* plain suit - any suit that is not a trump suit
* trick - cards thrown
* rank - position (value) of a card relative to others in the same suit
* shuffle - rearrange (a deck of cards)
* seat - position relative to the dealer
* ppn - Portable Preferans Notation (patent pending)

### API

cards:
* new						(cards)
* all						() - returns array of these cards
* getPPN					() - returns a PPN string representation
* toString					() - returns a plain string representation
* toUnicodeString			() - returns a Unicode string representation
* getOriginal				() - returns the original constructed list of cards
* getOriginalPPN			() - returns the original PPN string representation
* toOriginalString			() - returns the original plain string representation
* toOriginalUnicodeString	() - returns the original Unicode string representation

pile (extends cards):
* new	()
* sort	(config) - sort cards by config: e.g. {sorting: Pile.SORTING.SUITS, reversed: true}

deck (extends cards):
* new		()
* validate	(cards) - STATIC checks if the passed cards are a valid deck
* isValid	()	 - checks if it is valid
* restore	(cards) - restore desk from given cards
* cut		()	 - cut the deck
* shuffle	()	 - shuffle the deck
* deal		()	 - deal to 3 players and talon

card:
* new		()
* compare	(c1, c2, trump) - STATIC compare two cards for trump
* beats		(card, trump) - check if it beats given card for trump
* getters...
    * value
    * suit
    * rank
    * label
    * ppn
* toString			() - return cards two character representation
* toUnicodeString	() - return cards value + unicode sign for suit

ppn:
* all	()	 - get all cards PPN representations
* ppn	(label) - get PPN representation for label
* ppns	(labels) - get PPN representations for labels
* card	(ppn) - get a Card instance for given PPN representation
* cards	(ppns) - get Card instances for given PPN representations

rank:
* rank		(r) - get rank for value
* isValid	(r) - check if the value is valid
* all		() - get all ranks array

suit:
* suit		(r) - get suit for label
* isValid	(r) - check if the label is valid
* toUnicode	() - return unicode sign for suit
* all		() - get all suits array

value:
* value		(r) - get value for label
* isValid	(r) - check if the label is valid
* all		() - get all values array
