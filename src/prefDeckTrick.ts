#!/usr/bin/env node
'use strict';

import PrefDeckCard, { PrefDeckSuit } from './prefDeckCard';

type _PrefDeckTrickPlayer = { player: 'p1' | 'p2' | 'p3', card: PrefDeckCard };

enum _PrefDeckTrump {
	NONE = '',
	SPADE = 'Spade',
	DIAMOND = 'Diamond',
	HEART = 'Heart',
	CLUB = 'Club'
}

const _trump2suit = (trump: _PrefDeckTrump): PrefDeckSuit | undefined => {
	if (!trump) return undefined;
	switch (trump) {
		case _PrefDeckTrump.SPADE:
			return PrefDeckSuit.SPADE;
		case _PrefDeckTrump.DIAMOND:
			return PrefDeckSuit.DIAMOND;
		case _PrefDeckTrump.HEART:
			return PrefDeckSuit.HEART;
		case _PrefDeckTrump.CLUB:
			return PrefDeckSuit.CLUB;
	}
};

const _suit2trump = (suit: PrefDeckSuit): _PrefDeckTrump => {
	switch (suit) {
		case PrefDeckSuit.SPADE:
			return _PrefDeckTrump.SPADE;
		case PrefDeckSuit.DIAMOND:
			return _PrefDeckTrump.DIAMOND;
		case PrefDeckSuit.HEART:
			return _PrefDeckTrump.HEART;
		case PrefDeckSuit.CLUB:
			return _PrefDeckTrump.CLUB;
	}
};

const _playerJsonOrEmpty = (p: _PrefDeckTrickPlayer): {} | { card: string, player: 'p1' | 'p2' | 'p3' } => (p && p.card && p.player)
	? { card: p.card.label, player: p.player }
	: {};

const _firstWins = (c1: PrefDeckCard, c2: PrefDeckCard, c3?: PrefDeckCard, suit?: PrefDeckSuit): boolean => c1.beats(c2, suit) && (!c3 || c1.beats(c3, suit));
const _secondWins = (c1: PrefDeckCard, c2: PrefDeckCard, c3?: PrefDeckCard, suit?: PrefDeckSuit): boolean => !c1.beats(c2, suit) && (!c3 || c2.beats(c3, suit));
// const _thirdWins = (c1: PrefDeckCard, c2: PrefDeckCard, c3?: PrefDeckCard, suit?: PrefDeckSuit): boolean => !!c3 && !c1.beats(c3, suit) && !c2.beats(c3, suit);

export default class PrefDeckTrick {
	private readonly _players: 2 | 3;
	private readonly _trump: _PrefDeckTrump = _PrefDeckTrump.NONE;

	private _first!: _PrefDeckTrickPlayer;
	private _second!: _PrefDeckTrickPlayer;
	private _third!: _PrefDeckTrickPlayer;
	private _winner: 'p1' | 'p2' | 'p3' | undefined = undefined;

	constructor(players: 2 | 3, trumpSuit?: PrefDeckSuit) {
		this._players = players;
		if (trumpSuit !== undefined) this._trump = _suit2trump(trumpSuit);
	}

	public throw(player: 'p1' | 'p2' | 'p3', card: PrefDeckCard): PrefDeckTrick {
		if (!this._first) this._first = { player, card };
		else if (!this._second) this._second = { player, card };
		else if (this._players === 3 && !this._third) this._third = { player, card };
		else throw new Error('PrefDeckTrick::throw:Trick is already full:[' + this.string + ']');

		this.calculateWinner();
		return this;
	}

	get first(): PrefDeckCard | null {
		return this._first ? this._first.card : null;
	}

	get second(): PrefDeckCard | null {
		return this._second ? this._second.card : null;
	}

	get third(): PrefDeckCard | null {
		return this._third ? this._third.card : null;
	}

	get suit(): PrefDeckSuit | undefined {
		return _trump2suit(this._trump);
	}

	get winner(): 'p1' | 'p2' | 'p3' {
		if (!this._winner) this.calculateWinner();
		if (this._winner) return this._winner;
		throw new Error('PrefDeckTrick::winner:Winner not found: [' + this.string + ']');
	}

	get ppn(): string {
		const a = this._first ? this._first.card.ppn : '';
		const b = this._second ? this._second.card.ppn : '';
		const c = this._third ? this._third.card.ppn : '';
		return a + b + c;
	}

	get json(): any {
		return {
			players: this._players,
			first: _playerJsonOrEmpty(this._first),
			second: _playerJsonOrEmpty(this._second),
			third: _playerJsonOrEmpty(this._third),
			trump: this._trump,
			winner: this._winner,
		};
	}

	get string(): string {
		return JSON.stringify(this.json);
	}

	get full(): boolean {
		let cnt = 0;
		if (this._first) cnt++;
		if (this._second) cnt++;
		if (this._third) cnt++;
		return cnt === this._players;
	}

	private calculateWinner(): PrefDeckTrick {
		this._winner = undefined;
		if (!this.full) return this;

		const suit = _trump2suit(this._trump);
		const c1 = this._first.card;
		const c2 = this._second.card;
		const c3 = this._third ? this._third.card : undefined;

		if (_firstWins(c1, c2, c3, suit)) this._winner = this._first.player;
		else if (_secondWins(c1, c2, c3, suit)) this._winner = this._second.player;
		else this._winner = this._third.player;

		return this;
	}

}
