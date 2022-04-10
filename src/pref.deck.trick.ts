'use strict';

import PrefDeckCard from './pref.deck.Card';
import PrefDeckSuit from './enums/pref.deck.suit';
import PrefDeckTrickPlayerType from './types/pref.deck.trick.player.type';
import PrefDeckTrump from './enums/pref.deck.trump';

import playerToJSON from './functions/trick/player.to.json';
import convertTrumpToSuit from './functions/trick/convert.trump.to.suit';
import convertSuitToTrump from './functions/trick/convert.suit.to.trump';
import isFirstPlayerTheWinner from './functions/trick/is.first.player.the.winner';
import isSecondPlayerTheWinner from './functions/trick/is.second.player.the.winner';

export default class PrefDeckTrick {
	private readonly _players: 2 | 3;
	private readonly _trump: PrefDeckTrump = PrefDeckTrump.NONE;

	private _first!: PrefDeckTrickPlayerType;
	private _second!: PrefDeckTrickPlayerType;
	private _third!: PrefDeckTrickPlayerType;
	private _winner: 'p1' | 'p2' | 'p3' | undefined = undefined;

	constructor(players: 2 | 3, trumpSuit?: PrefDeckSuit) {
		this._players = players;
		if (trumpSuit !== undefined) this._trump = convertSuitToTrump(trumpSuit);
	}

	public throw(player: 'p1' | 'p2' | 'p3', card: PrefDeckCard): PrefDeckTrick {
		if (!this._first) this._first = {player, card};
		else if (!this._second) this._second = {player, card};
		else if (this._players === 3 && !this._third) this._third = {player, card};
		else throw new Error('PrefDeckTrick::throw:Trick is already full:[' + this.string + ']');

		this._calculateWinner();
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
		return convertTrumpToSuit(this._trump);
	}

	get winner(): 'p1' | 'p2' | 'p3' {
		if (!this._winner) this._calculateWinner();
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
			first: playerToJSON(this._first),
			second: playerToJSON(this._second),
			third: playerToJSON(this._third),
			trump: this._trump,
			winner: this._winner
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

	private _calculateWinner(): PrefDeckTrick {
		this._winner = undefined;
		if (!this.full) return this;

		const suit = convertTrumpToSuit(this._trump);
		const c1 = this._first.card;
		const c2 = this._second.card;
		const c3 = this._third ? this._third.card : undefined;

		if (isFirstPlayerTheWinner(c1, c2, c3, suit)) this._winner = this._first.player;
		else if (isSecondPlayerTheWinner(c1, c2, c3, suit)) this._winner = this._second.player;
		else this._winner = this._third.player;

		return this;
	}
}
