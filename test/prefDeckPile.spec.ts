import {expect} from 'chai';
import * as _ from "lodash";
import PrefDeckPile, {PrefDeckPileSorting} from "../src/prefDeckPile";
import PrefDeckCard from "../src/prefDeckCard";

const tests = [
	// 4 suits, BLACK:
	{
		sorting: PrefDeckPileSorting.BLACK,
		__cards: _.map(_.split("G2719MRU4H", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 10,
		ppnString: "G2719MRU4H",
		ppnSortedString: "12479GRUHM",
		unicodeString: "A♦8♠K♠7♠7♦Q♥9♣Q♣X♠7♥",
		unicodeSortedString: "7♠8♠X♠K♠7♦A♦9♣Q♣7♥Q♥",
		fullString: "ADiamond8SpadeKSpade7Spade7DiamondQHeart9ClubQClubXSpade7Heart",
		fullSortedString: "7Spade8SpadeXSpadeKSpade7DiamondADiamond9ClubQClub7HeartQHeart"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("G2719MRU4H", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 10,
		ppnString: "G2719MRU4H",
		ppnSortedString: "7421G9URMH",
		unicodeString: "A♦8♠K♠7♠7♦Q♥9♣Q♣X♠7♥",
		unicodeSortedString: "K♠X♠8♠7♠A♦7♦Q♣9♣Q♥7♥",
		fullString: "ADiamond8SpadeKSpade7Spade7DiamondQHeart9ClubQClubXSpade7Heart",
		fullSortedString: "KSpadeXSpade8Spade7SpadeADiamond7DiamondQClub9ClubQHeart7Heart"
	},
	// 4 suits, RED:
	{
		sorting: PrefDeckPileSorting.RED,
		__cards: _.map(_.split("G2719MRU4H", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 10,
		ppnString: "G2719MRU4H",
		ppnSortedString: "9G1247HMRU",
		unicodeString: "A♦8♠K♠7♠7♦Q♥9♣Q♣X♠7♥",
		unicodeSortedString: "7♦A♦7♠8♠X♠K♠7♥Q♥9♣Q♣",
		fullString: "ADiamond8SpadeKSpade7Spade7DiamondQHeart9ClubQClubXSpade7Heart",
		fullSortedString: "7DiamondADiamond7Spade8SpadeXSpadeKSpade7HeartQHeart9ClubQClub"
	}, {
		sorting: PrefDeckPileSorting.RED_REVERSE,
		__cards: _.map(_.split("G2719MRU4H", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 10,
		ppnString: "G2719MRU4H",
		ppnSortedString: "G97421MHUR",
		unicodeString: "A♦8♠K♠7♠7♦Q♥9♣Q♣X♠7♥",
		unicodeSortedString: "A♦7♦K♠X♠8♠7♠Q♥7♥Q♣9♣",
		fullString: "ADiamond8SpadeKSpade7Spade7DiamondQHeart9ClubQClubXSpade7Heart",
		fullSortedString: "ADiamond7DiamondKSpadeXSpade8Spade7SpadeQHeart7HeartQClub9Club"
	},
	// 4 suits, SUITS:
	{
		sorting: PrefDeckPileSorting.SUITS,
		__cards: _.map(_.split("G2719MRU4H", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 10,
		ppnString: "G2719MRU4H",
		ppnSortedString: "12479GHMRU",
		unicodeString: "A♦8♠K♠7♠7♦Q♥9♣Q♣X♠7♥",
		unicodeSortedString: "7♠8♠X♠K♠7♦A♦7♥Q♥9♣Q♣",
		fullString: "ADiamond8SpadeKSpade7Spade7DiamondQHeart9ClubQClubXSpade7Heart",
		fullSortedString: "7Spade8SpadeXSpadeKSpade7DiamondADiamond7HeartQHeart9ClubQClub"
	}, {
		sorting: PrefDeckPileSorting.SUITS_REVERSE,
		__cards: _.map(_.split("G2719MRU4H", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 10,
		ppnString: "G2719MRU4H",
		ppnSortedString: "7421G9MHUR",
		unicodeString: "A♦8♠K♠7♠7♦Q♥9♣Q♣X♠7♥",
		unicodeSortedString: "K♠X♠8♠7♠A♦7♦Q♥7♥Q♣9♣",
		fullString: "ADiamond8SpadeKSpade7Spade7DiamondQHeart9ClubQClubXSpade7Heart",
		fullSortedString: "KSpadeXSpade8Spade7SpadeADiamond7DiamondQHeart7HeartQClub9Club"
	},
	// 4 suits, NONE:
	{
		sorting: PrefDeckPileSorting.NONE,
		__cards: _.map(_.split("G2719MRU4H", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 10,
		ppnString: "G2719MRU4H",
		ppnSortedString: "G2719MRU4H",
		unicodeString: "A♦8♠K♠7♠7♦Q♥9♣Q♣X♠7♥",
		unicodeSortedString: "A♦8♠K♠7♠7♦Q♥9♣Q♣X♠7♥",
		fullString: "ADiamond8SpadeKSpade7Spade7DiamondQHeart9ClubQClubXSpade7Heart",
		fullSortedString: "ADiamond8SpadeKSpade7Spade7DiamondQHeart9ClubQClubXSpade7Heart"
	}, {
		sorting: PrefDeckPileSorting.NONE,
		__cards: _.map(_.split("G2719MRU4H", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 10,
		ppnString: "G2719MRU4H",
		ppnSortedString: "G2719MRU4H",
		unicodeString: "A♦8♠K♠7♠7♦Q♥9♣Q♣X♠7♥",
		unicodeSortedString: "A♦8♠K♠7♠7♦Q♥9♣Q♣X♠7♥",
		fullString: "ADiamond8SpadeKSpade7Spade7DiamondQHeart9ClubQClubXSpade7Heart",
		fullSortedString: "ADiamond8SpadeKSpade7Spade7DiamondQHeart9ClubQClubXSpade7Heart"
	},

	// 3 suits, no spade:
	{
		__cards: _.map(_.split("DEKSLUAQ", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "DEKSLUAQ",
		ppnSortedString: "ADEQSUKL",
		unicodeString: "J♦Q♦X♥X♣J♥Q♣8♦8♣",
		unicodeSortedString: "8♦J♦Q♦8♣X♣Q♣X♥J♥",
		fullString: "JDiamondQDiamondXHeartXClubJHeartQClub8Diamond8Club",
		fullSortedString: "8DiamondJDiamondQDiamond8ClubXClubQClubXHeartJHeart"
	},
	{
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("DEKSLUAQ", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "DEKSLUAQ",
		ppnSortedString: "EDAUSQLK",
		unicodeString: "J♦Q♦X♥X♣J♥Q♣8♦8♣",
		unicodeSortedString: "Q♦J♦8♦Q♣X♣8♣J♥X♥",
		fullString: "JDiamondQDiamondXHeartXClubJHeartQClub8Diamond8Club",
		fullSortedString: "QDiamondJDiamond8DiamondQClubXClub8ClubJHeartXHeart"
	},
	// 3 suits, no diamond:
	{
		__cards: _.map(_.split("271MRU4H", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "271MRU4H",
		ppnSortedString: "1247HMRU",
		unicodeString: "8♠K♠7♠Q♥9♣Q♣X♠7♥",
		unicodeSortedString: "7♠8♠X♠K♠7♥Q♥9♣Q♣",
		fullString: "8SpadeKSpade7SpadeQHeart9ClubQClubXSpade7Heart",
		fullSortedString: "7Spade8SpadeXSpadeKSpade7HeartQHeart9ClubQClub"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("271MRU4H", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "271MRU4H",
		ppnSortedString: "7421MHUR",
		unicodeString: "8♠K♠7♠Q♥9♣Q♣X♠7♥",
		unicodeSortedString: "K♠X♠8♠7♠Q♥7♥Q♣9♣",
		fullString: "8SpadeKSpade7SpadeQHeart9ClubQClubXSpade7Heart",
		fullSortedString: "KSpadeXSpade8Spade7SpadeQHeart7HeartQClub9Club"
	},
	// 3 suits, no heart:
	{
		__cards: _.map(_.split("RA4CT12P", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "RA4CT12P",
		ppnSortedString: "124ACPRT",
		unicodeString: "9♣8♦X♠X♦J♣7♠8♠7♣",
		unicodeSortedString: "7♠8♠X♠8♦X♦7♣9♣J♣",
		fullString: "9Club8DiamondXSpadeXDiamondJClub7Spade8Spade7Club",
		fullSortedString: "7Spade8SpadeXSpade8DiamondXDiamond7Club9ClubJClub"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("RA4CT12P", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "RA4CT12P",
		ppnSortedString: "421CATRP",
		unicodeString: "9♣8♦X♠X♦J♣7♠8♠7♣",
		unicodeSortedString: "X♠8♠7♠X♦8♦J♣9♣7♣",
		fullString: "9Club8DiamondXSpadeXDiamondJClub7Spade8Spade7Club",
		fullSortedString: "XSpade8Spade7SpadeXDiamond8DiamondJClub9Club7Club"
	},
	// 3 suits, no club:
	{
		sorting: PrefDeckPileSorting.BLACK,
		__cards: _.map(_.split("DFA61MNO", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "DFA61MNO",
		ppnSortedString: "ADF16MNO",
		unicodeString: "J♦K♦8♦Q♠7♠Q♥K♥A♥",
		unicodeSortedString: "8♦J♦K♦7♠Q♠Q♥K♥A♥",
		fullString: "JDiamondKDiamond8DiamondQSpade7SpadeQHeartKHeartAHeart",
		fullSortedString: "8DiamondJDiamondKDiamond7SpadeQSpadeQHeartKHeartAHeart"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("DFA61MNO", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "DFA61MNO",
		ppnSortedString: "FDA61ONM",
		unicodeString: "J♦K♦8♦Q♠7♠Q♥K♥A♥",
		unicodeSortedString: "K♦J♦8♦Q♠7♠A♥K♥Q♥",
		fullString: "JDiamondKDiamond8DiamondQSpade7SpadeQHeartKHeartAHeart",
		fullSortedString: "KDiamondJDiamond8DiamondQSpade7SpadeAHeartKHeartQHeart"
	},

	// 2 suits, spade-diamond:
	{
		__cards: _.map(_.split("BC42A96G", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "BC42A96G",
		ppnSortedString: "2469ABCG",
		unicodeString: "9♦X♦X♠8♠8♦7♦Q♠A♦",
		unicodeSortedString: "8♠X♠Q♠7♦8♦9♦X♦A♦",
		fullString: "9DiamondXDiamondXSpade8Spade8Diamond7DiamondQSpadeADiamond",
		fullSortedString: "8SpadeXSpadeQSpade7Diamond8Diamond9DiamondXDiamondADiamond"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("BC42A96G", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "BC42A96G",
		ppnSortedString: "642GCBA9",
		unicodeString: "9♦X♦X♠8♠8♦7♦Q♠A♦",
		unicodeSortedString: "Q♠X♠8♠A♦X♦9♦8♦7♦",
		fullString: "9DiamondXDiamondXSpade8Spade8Diamond7DiamondQSpadeADiamond",
		fullSortedString: "QSpadeXSpade8SpadeADiamondXDiamond9Diamond8Diamond7Diamond"
	},
	// 2 suits, spade-diamond, BLACK:
	{
		sorting: PrefDeckPileSorting.BLACK,
		__cards: _.map(_.split("BC42A96G", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "BC42A96G",
		ppnSortedString: "2469ABCG",
		unicodeString: "9♦X♦X♠8♠8♦7♦Q♠A♦",
		unicodeSortedString: "8♠X♠Q♠7♦8♦9♦X♦A♦",
		fullString: "9DiamondXDiamondXSpade8Spade8Diamond7DiamondQSpadeADiamond",
		fullSortedString: "8SpadeXSpadeQSpade7Diamond8Diamond9DiamondXDiamondADiamond"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("BC42A96G", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "BC42A96G",
		ppnSortedString: "642GCBA9",
		unicodeString: "9♦X♦X♠8♠8♦7♦Q♠A♦",
		unicodeSortedString: "Q♠X♠8♠A♦X♦9♦8♦7♦",
		fullString: "9DiamondXDiamondXSpade8Spade8Diamond7DiamondQSpadeADiamond",
		fullSortedString: "QSpadeXSpade8SpadeADiamondXDiamond9Diamond8Diamond7Diamond"
	},
	// 2 suits, spade-diamond, RED:
	{
		sorting: PrefDeckPileSorting.RED,
		__cards: _.map(_.split("BC42A96G", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "BC42A96G",
		ppnSortedString: "9ABCG246",
		unicodeString: "9♦X♦X♠8♠8♦7♦Q♠A♦",
		unicodeSortedString: "7♦8♦9♦X♦A♦8♠X♠Q♠",
		fullString: "9DiamondXDiamondXSpade8Spade8Diamond7DiamondQSpadeADiamond",
		fullSortedString: "7Diamond8Diamond9DiamondXDiamondADiamond8SpadeXSpadeQSpade"
	}, {
		sorting: PrefDeckPileSorting.RED_REVERSE,
		__cards: _.map(_.split("BC42A96G", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "BC42A96G",
		ppnSortedString: "GCBA9642",
		unicodeString: "9♦X♦X♠8♠8♦7♦Q♠A♦",
		unicodeSortedString: "A♦X♦9♦8♦7♦Q♠X♠8♠",
		fullString: "9DiamondXDiamondXSpade8Spade8Diamond7DiamondQSpadeADiamond",
		fullSortedString: "ADiamondXDiamond9Diamond8Diamond7DiamondQSpadeXSpade8Spade"
	},
	// 2 suits, spade-diamond, SUITS:
	{
		sorting: PrefDeckPileSorting.SUITS,
		__cards: _.map(_.split("BC42A96G", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "BC42A96G",
		ppnSortedString: "2469ABCG",
		unicodeString: "9♦X♦X♠8♠8♦7♦Q♠A♦",
		unicodeSortedString: "8♠X♠Q♠7♦8♦9♦X♦A♦",
		fullString: "9DiamondXDiamondXSpade8Spade8Diamond7DiamondQSpadeADiamond",
		fullSortedString: "8SpadeXSpadeQSpade7Diamond8Diamond9DiamondXDiamondADiamond"
	}, {
		sorting: PrefDeckPileSorting.SUITS_REVERSE,
		__cards: _.map(_.split("BC42A96G", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "BC42A96G",
		ppnSortedString: "642GCBA9",
		unicodeString: "9♦X♦X♠8♠8♦7♦Q♠A♦",
		unicodeSortedString: "Q♠X♠8♠A♦X♦9♦8♦7♦",
		fullString: "9DiamondXDiamondXSpade8Spade8Diamond7DiamondQSpadeADiamond",
		fullSortedString: "QSpadeXSpade8SpadeADiamondXDiamond9Diamond8Diamond7Diamond"
	},
	// 2 suits, spade-heart:
	{
		__cards: _.map(_.split("J16LK42O", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "J16LK42O",
		ppnSortedString: "1246JKLO",
		unicodeString: "9♥7♠Q♠J♥X♥X♠8♠A♥",
		unicodeSortedString: "7♠8♠X♠Q♠9♥X♥J♥A♥",
		fullString: "9Heart7SpadeQSpadeJHeartXHeartXSpade8SpadeAHeart",
		fullSortedString: "7Spade8SpadeXSpadeQSpade9HeartXHeartJHeartAHeart"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("J16LK42O", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "J16LK42O",
		ppnSortedString: "6421OLKJ",
		unicodeString: "9♥7♠Q♠J♥X♥X♠8♠A♥",
		unicodeSortedString: "Q♠X♠8♠7♠A♥J♥X♥9♥",
		fullString: "9Heart7SpadeQSpadeJHeartXHeartXSpade8SpadeAHeart",
		fullSortedString: "QSpadeXSpade8Spade7SpadeAHeartJHeartXHeart9Heart"
	},
	// 2 suits, spade-club:
	{
		__cards: _.map(_.split("Q23PR85U", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "Q23PR85U",
		ppnSortedString: "2358PQRU",
		unicodeString: "8♣8♠9♠7♣9♣A♠J♠Q♣",
		unicodeSortedString: "8♠9♠J♠A♠7♣8♣9♣Q♣",
		fullString: "8Club8Spade9Spade7Club9ClubASpadeJSpadeQClub",
		fullSortedString: "8Spade9SpadeJSpadeASpade7Club8Club9ClubQClub"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("Q23PR85U", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "Q23PR85U",
		ppnSortedString: "8532URQP",
		unicodeString: "8♣8♠9♠7♣9♣A♠J♠Q♣",
		unicodeSortedString: "A♠J♠9♠8♠Q♣9♣8♣7♣",
		fullString: "8Club8Spade9Spade7Club9ClubASpadeJSpadeQClub",
		fullSortedString: "ASpadeJSpade9Spade8SpadeQClub9Club8Club7Club"
	},
	// 2 suits, diamond-heart:
	{
		__cards: _.map(_.split("OJAMBFNC", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "OJAMBFNC",
		ppnSortedString: "ABCFJMNO",
		unicodeString: "A♥9♥8♦Q♥9♦K♦K♥X♦",
		unicodeSortedString: "8♦9♦X♦K♦9♥Q♥K♥A♥",
		fullString: "AHeart9Heart8DiamondQHeart9DiamondKDiamondKHeartXDiamond",
		fullSortedString: "8Diamond9DiamondXDiamondKDiamond9HeartQHeartKHeartAHeart"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("OJAMBFNC", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "OJAMBFNC",
		ppnSortedString: "FCBAONMJ",
		unicodeString: "A♥9♥8♦Q♥9♦K♦K♥X♦",
		unicodeSortedString: "K♦X♦9♦8♦A♥K♥Q♥9♥",
		fullString: "AHeart9Heart8DiamondQHeart9DiamondKDiamondKHeartXDiamond",
		fullSortedString: "KDiamondXDiamond9Diamond8DiamondAHeartKHeartQHeart9Heart"
	},
	// 2 suits, diamond-club:
	{
		__cards: _.map(_.split("QA9PRCDU", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "QA9PRCDU",
		ppnSortedString: "PQRU9ACD",
		unicodeString: "8♣8♦7♦7♣9♣X♦J♦Q♣",
		unicodeSortedString: "7♣8♣9♣Q♣7♦8♦X♦J♦",
		fullString: "8Club8Diamond7Diamond7Club9ClubXDiamondJDiamondQClub",
		fullSortedString: "7Club8Club9ClubQClub7Diamond8DiamondXDiamondJDiamond"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("QA9PRCDU", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "QA9PRCDU",
		ppnSortedString: "URQPDCA9",
		unicodeString: "8♣8♦7♦7♣9♣X♦J♦Q♣",
		unicodeSortedString: "Q♣9♣8♣7♣J♦X♦8♦7♦",
		fullString: "8Club8Diamond7Diamond7Club9ClubXDiamondJDiamondQClub",
		fullSortedString: "QClub9Club8Club7ClubJDiamondXDiamond8Diamond7Diamond"
	},
	// 2 suits, diamond-club, RED:
	{
		sorting: PrefDeckPileSorting.RED,
		__cards: _.map(_.split("QA9PRCDU", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "QA9PRCDU",
		ppnSortedString: "9ACDPQRU",
		unicodeString: "8♣8♦7♦7♣9♣X♦J♦Q♣",
		unicodeSortedString: "7♦8♦X♦J♦7♣8♣9♣Q♣",
		fullString: "8Club8Diamond7Diamond7Club9ClubXDiamondJDiamondQClub",
		fullSortedString: "7Diamond8DiamondXDiamondJDiamond7Club8Club9ClubQClub"
	}, {
		sorting: PrefDeckPileSorting.RED_REVERSE,
		__cards: _.map(_.split("QA9PRCDU", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "QA9PRCDU",
		ppnSortedString: "DCA9URQP",
		unicodeString: "8♣8♦7♦7♣9♣X♦J♦Q♣",
		unicodeSortedString: "J♦X♦8♦7♦Q♣9♣8♣7♣",
		fullString: "8Club8Diamond7Diamond7Club9ClubXDiamondJDiamondQClub",
		fullSortedString: "JDiamondXDiamond8Diamond7DiamondQClub9Club8Club7Club"
	},
	// 2 suits, diamond-club, BLACK:
	{
		sorting: PrefDeckPileSorting.BLACK,
		__cards: _.map(_.split("QA9PRCDU", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "QA9PRCDU",
		ppnSortedString: "PQRU9ACD",
		unicodeString: "8♣8♦7♦7♣9♣X♦J♦Q♣",
		unicodeSortedString: "7♣8♣9♣Q♣7♦8♦X♦J♦",
		fullString: "8Club8Diamond7Diamond7Club9ClubXDiamondJDiamondQClub",
		fullSortedString: "7Club8Club9ClubQClub7Diamond8DiamondXDiamondJDiamond"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("QA9PRCDU", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "QA9PRCDU",
		ppnSortedString: "URQPDCA9",
		unicodeString: "8♣8♦7♦7♣9♣X♦J♦Q♣",
		unicodeSortedString: "Q♣9♣8♣7♣J♦X♦8♦7♦",
		fullString: "8Club8Diamond7Diamond7Club9ClubXDiamondJDiamondQClub",
		fullSortedString: "QClub9Club8Club7ClubJDiamondXDiamond8Diamond7Diamond"
	},
	// 2 suits, diamond-club, SUITS:
	{
		sorting: PrefDeckPileSorting.SUITS,
		__cards: _.map(_.split("QA9PRCDU", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "QA9PRCDU",
		ppnSortedString: "9ACDPQRU",
		unicodeString: "8♣8♦7♦7♣9♣X♦J♦Q♣",
		unicodeSortedString: "7♦8♦X♦J♦7♣8♣9♣Q♣",
		fullString: "8Club8Diamond7Diamond7Club9ClubXDiamondJDiamondQClub",
		fullSortedString: "7Diamond8DiamondXDiamondJDiamond7Club8Club9ClubQClub"
	}, {
		sorting: PrefDeckPileSorting.SUITS_REVERSE,
		__cards: _.map(_.split("QA9PRCDU", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "QA9PRCDU",
		ppnSortedString: "DCA9URQP",
		unicodeString: "8♣8♦7♦7♣9♣X♦J♦Q♣",
		unicodeSortedString: "J♦X♦8♦7♦Q♣9♣8♣7♣",
		fullString: "8Club8Diamond7Diamond7Club9ClubXDiamondJDiamondQClub",
		fullSortedString: "JDiamondXDiamond8Diamond7DiamondQClub9Club8Club7Club"
	}
	,
	// 2 suits, heart-club:
	{
		sorting: PrefDeckPileSorting.BLACK,
		__cards: _.map(_.split("PKWVINQR", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "PKWVINQR",
		ppnSortedString: "PQRVWIKN",
		unicodeString: "7♣X♥A♣K♣8♥K♥8♣9♣",
		unicodeSortedString: "7♣8♣9♣K♣A♣8♥X♥K♥",
		fullString: "7ClubXHeartAClubKClub8HeartKHeart8Club9Club",
		fullSortedString: "7Club8Club9ClubKClubAClub8HeartXHeartKHeart"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("PKWVINQR", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 8,
		ppnString: "PKWVINQR",
		ppnSortedString: "WVRQPNKI",
		unicodeString: "7♣X♥A♣K♣8♥K♥8♣9♣",
		unicodeSortedString: "A♣K♣9♣8♣7♣K♥X♥8♥",
		fullString: "7ClubXHeartAClubKClub8HeartKHeart8Club9Club",
		fullSortedString: "AClubKClub9Club8Club7ClubKHeartXHeart8Heart"
	},

	// 1 suit, spade:
	{
		sorting: PrefDeckPileSorting.BLACK,
		__cards: _.map(_.split("364251", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 6,
		ppnString: "364251",
		ppnSortedString: "123456",
		unicodeString: "9♠Q♠X♠8♠J♠7♠",
		unicodeSortedString: "7♠8♠9♠X♠J♠Q♠",
		fullString: "9SpadeQSpadeXSpade8SpadeJSpade7Spade",
		fullSortedString: "7Spade8Spade9SpadeXSpadeJSpadeQSpade"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("364251", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 6,
		ppnString: "364251",
		ppnSortedString: "654321",
		unicodeString: "9♠Q♠X♠8♠J♠7♠",
		unicodeSortedString: "Q♠J♠X♠9♠8♠7♠",
		fullString: "9SpadeQSpadeXSpade8SpadeJSpade7Spade",
		fullSortedString: "QSpadeJSpadeXSpade9Spade8Spade7Spade"
	},
	// 1 suit, diamond:
	{
		sorting: PrefDeckPileSorting.BLACK,
		__cards: _.map(_.split("DFBCAG", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 6,
		ppnString: "DFBCAG",
		ppnSortedString: "ABCDFG",
		unicodeString: "J♦K♦9♦X♦8♦A♦",
		unicodeSortedString: "8♦9♦X♦J♦K♦A♦",
		fullString: "JDiamondKDiamond9DiamondXDiamond8DiamondADiamond",
		fullSortedString: "8Diamond9DiamondXDiamondJDiamondKDiamondADiamond"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("DFBCAG", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 6,
		ppnString: "DFBCAG",
		ppnSortedString: "GFDCBA",
		unicodeString: "J♦K♦9♦X♦8♦A♦",
		unicodeSortedString: "A♦K♦J♦X♦9♦8♦",
		fullString: "JDiamondKDiamond9DiamondXDiamond8DiamondADiamond",
		fullSortedString: "ADiamondKDiamondJDiamondXDiamond9Diamond8Diamond"
	},
	// 1 suit, heart:
	{
		sorting: PrefDeckPileSorting.BLACK,
		__cards: _.map(_.split("MKILOH", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 6,
		ppnString: "MKILOH",
		ppnSortedString: "HIKLMO",
		unicodeString: "Q♥X♥8♥J♥A♥7♥",
		unicodeSortedString: "7♥8♥X♥J♥Q♥A♥",
		fullString: "QHeartXHeart8HeartJHeartAHeart7Heart",
		fullSortedString: "7Heart8HeartXHeartJHeartQHeartAHeart"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("MKILOH", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 6,
		ppnString: "MKILOH",
		ppnSortedString: "OMLKIH",
		unicodeString: "Q♥X♥8♥J♥A♥7♥",
		unicodeSortedString: "A♥Q♥J♥X♥8♥7♥",
		fullString: "QHeartXHeart8HeartJHeartAHeart7Heart",
		fullSortedString: "AHeartQHeartJHeartXHeart8Heart7Heart"
	},
	// 1 suit, club:
	{
		sorting: PrefDeckPileSorting.BLACK,
		__cards: _.map(_.split("TRSUPW", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 6,
		ppnString: "TRSUPW",
		ppnSortedString: "PRSTUW",
		unicodeString: "J♣9♣X♣Q♣7♣A♣",
		unicodeSortedString: "7♣9♣X♣J♣Q♣A♣",
		fullString: "JClub9ClubXClubQClub7ClubAClub",
		fullSortedString: "7Club9ClubXClubJClubQClubAClub"
	}, {
		sorting: PrefDeckPileSorting.BLACK_REVERSE,
		__cards: _.map(_.split("TRSUPW", ""), (c: string): PrefDeckCard => PrefDeckCard.ppnToCard(c)),
		size: 6,
		ppnString: "TRSUPW",
		ppnSortedString: "WUTSRP",
		unicodeString: "J♣9♣X♣Q♣7♣A♣",
		unicodeSortedString: "A♣Q♣J♣X♣9♣7♣",
		fullString: "JClub9ClubXClubQClub7ClubAClub",
		fullSortedString: "AClubQClubJClubXClub9Club7Club"
	}
];

describe("PrefDeckPile tests", () => {
	_.forEach(tests, (test: any): void => {
		describe("PrefDeckPile tests", () => {
			const sorting = test.sorting;
			const __cards = test.__cards;
			const size = test.size;
			const ppnString = test.ppnString;
			const ppnSortedString = test.ppnSortedString;
			const unicodeString = test.unicodeString;
			const unicodeSortedString = test.unicodeSortedString;
			const fullString = test.fullString;
			const fullSortedString = test.fullSortedString;

			describe("PrefDeckPile constructor/getters tests", () => {
				const pile = new PrefDeckPile(__cards);
				it("contructor should create object", () => {
					expect(() => new PrefDeckPile(__cards)).to.not.throw();
					expect(pile).to.be.a("object");
				});
				it("PrefDeckPile ppn should equal to " + ppnString, () => {
					expect(pile.ppn).to.be.equal(ppnString);
				});
				it("PrefDeckPile unicode should equal to " + unicodeString, () => {
					expect(pile.unicode).to.be.equal(unicodeString);
				});
				it("PrefDeckPile label should equal to " + fullString, () => {
					expect(pile.label).to.be.equal(fullString);
				});
				it("PrefDeckPile cards should return array", () => {
					expect(pile.cards).to.be.an("array");
				});
				it("PrefDeckPile cards should return " + size + " cards", () => {
					expect(pile.cards).to.have.lengthOf(size);
				});
			});

			describe("PrefDeckPile sort tests", () => {
				const pile = new PrefDeckPile(__cards);
				pile.sort(sorting);
				it("sort should create object", () => {
					expect(pile).to.be.a("object");
				});
				it("PrefDeckPile sort ppn should equal to " + ppnSortedString, () => {
					expect(pile.ppn).to.be.equal(ppnSortedString);
				});
				it("PrefDeckPile sort unicode should equal to " + unicodeSortedString, () => {
					expect(pile.unicode).to.be.equal(unicodeSortedString);
				});
				it("PrefDeckPile sort label should equal to " + fullSortedString, () => {
					expect(pile.label).to.be.equal(fullSortedString);
				});
				it("PrefDeckPile sort cards should return array", () => {
					expect(pile.cards).to.be.an("array");
				});
				it("PrefDeckPile sort cards should return " + size + " cards", () => {
					expect(pile.cards).to.have.lengthOf(size);
				});
			});

			describe("PrefDeckPile sort original tests", () => {
				const pile = new PrefDeckPile(__cards);
				pile.sort(sorting);
				it("PrefDeckPile originalPPN should equal to " + ppnString, () => {
					expect(pile.originalPPN).to.be.equal(ppnString);
				});
				it("PrefDeckPile originalUnicode should equal to " + unicodeString, () => {
					expect(pile.originalUnicode).to.be.equal(unicodeString);
				});
				it("PrefDeckPile originalLabel should equal to " + fullString, () => {
					expect(pile.originalLabel).to.be.equal(fullString);
				});
				it("PrefDeckPile getOriginal should return array", () => {
					expect(pile.original).to.be.an("array");
				});
				it("PrefDeckPile getOriginal should return " + size + " cards", () => {
					expect(pile.original).to.have.lengthOf(size);
				});
			});
		});
	});

});
