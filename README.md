<a href="http://prefko.com">
  <img alt="prefko" src="https://avatars0.githubusercontent.com/u/46445292?s=200" width="100">
</a>

# preferans-deck-js
[![build status](https://img.shields.io/travis/prefko/preferans-deck-js.svg?branch=master)](https://travis-ci.org/prefko/preferans-deck-js)
[![codacy](https://img.shields.io/codacy/grade/e8fd65d33fed4145968fae5cbb477145.svg)](https://www.codacy.com/project/prefko/preferans-deck-js/dashboard)
[![coverage](https://img.shields.io/coveralls/github/prefko/preferans-deck-js/master.svg)](https://coveralls.io/github/prefko/preferans-deck-js?branch=master)
[![dependencies](https://david-dm.org/prefko/preferans-deck-js.svg)](https://www.npmjs.com/package/preferans-deck-js)
[![npm](https://img.shields.io/npm/dt/preferans-deck-js.svg)](https://www.npmjs.com/package/preferans-deck-js) [![Greenkeeper badge](https://badges.greenkeeper.io/prefko/preferans-deck-js.svg)](https://greenkeeper.io/)

[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/prefko/preferans-deck-js)

preferans deck of cards

### Install
    yarn add preferans-deck-js

### Documentation

[TypeDoc documentation](https://prefko.github.io/preferans-deck-js/docs/)

### Usage

    const preferansDeckJs = require("preferans-deck-js");
    const Deck = preferansDeckJs.default;
    const Card = preferansDeckJs.Card;

    let card = new Card('7');
    console.log(card.unicode);
    // K♠

    let deck = new Deck();
    let deal = deck.deal;
    console.log("Hand 1:", deal.hand1.unicode);
    console.log("Hand 2:", deal.hand2.unicode);
    console.log("Hand 3:", deal.hand3.unicode);
    console.log("Talon:", deal.talon.talon1.unicode + deal.talon.talon2.unicode);

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

[Wiki API](https://github.com/prefko/preferans-deck-js/wiki/API)
