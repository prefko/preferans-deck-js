# preferans-deck-js
[![build status](https://img.shields.io/travis/cope/preferans-deck-js.svg?branch=master)](https://travis-ci.org/cope/preferans-deck-js)
[![codacy](https://img.shields.io/codacy/grade/e8fd65d33fed4145968fae5cbb477145.svg)](https://www.codacy.com/project/cope/preferans-deck-js/dashboard)
[![coverage](https://img.shields.io/coveralls/github/cope/preferans-deck-js/master.svg)](https://coveralls.io/github/cope/preferans-deck-js?branch=master)
[![dependencies](https://david-dm.org/cope/preferans-deck-js.svg)](https://www.npmjs.com/package/preferans-deck-js)
[![npm](https://img.shields.io/npm/dt/preferans-deck-js.svg)](https://www.npmjs.com/package/preferans-deck-js)

nodejs deck of cards for preferans

### Install
    yarn add preferans-deck-js

### Documentation

[TypeDoc documentation](https://prefko.github.io/preferans-deck-js/docs/)

### Usage

    const Deck = require('preferans-deck-js');
    const Card = Deck.Card;

    let card = new Card('7');
    console.log(card.toUnicodeString());
    // K♠

    let deck = new Deck();
    let deal = deck.deal();
    console.log("Hand 1:", deal.h1.toUnicodeString());
    console.log("Hand 2:", deal.h2.toUnicodeString());
    console.log("Hand 3:", deal.h3.toUnicodeString());
    console.log("Talon:", deal.t.toUnicodeString());

    // Hand 1: 7♠8♠9♠X♠J♠8♥9♥X♥J♥Q♥
    // Hand 2: Q♠K♠A♠7♦8♦K♥A♥7♣8♣9♣
    // Hand 3: 9♦X♦J♦Q♦K♦X♣J♣Q♣K♣A♣
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

[Wiki API](https://github.com/cope/preferans-deck-js/wiki/API)
