'use strict';

import PrefDeckTrickPlayerType from '../../types/pref.deck.trick.player.type';

const playerToJSON = (p: PrefDeckTrickPlayerType): {} | {card: string; player: 'p1' | 'p2' | 'p3'} =>
	p && p.card && p.player
		? {
				card: p.card.label,
				player: p.player
			}
		: {};
export default playerToJSON;
