#!/usr/bin/env node
'use strict';

import PrefDeckCard from "./prefDeckCard";
import PrefDeckPile from "./prefDeckPile";

export type TPrefDeckTalon = { talon1: PrefDeckCard, talon2: PrefDeckCard };
export type TPrefDeckDeal = { hand1: PrefDeckPile, hand2: PrefDeckPile, hand3: PrefDeckPile, talon: TPrefDeckTalon }

export type TPrefDeckTrickPlayer = { player: 'p1' | 'p2' | 'p3', card: PrefDeckCard };
