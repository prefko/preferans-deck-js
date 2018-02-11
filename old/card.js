lib = ("undefined" === typeof lib) ? {} : lib;
lib.Card = ("undefined" === typeof lib.Card) ? {} : lib.Card;

lib.Card.beats = function (card1, card2, adut) {
    if (card2) {
        var card1adut = lib.Adut.cardAdut(card1);
        var card2adut = lib.Adut.cardAdut(card2);
        if (card1adut === card2adut) {
            return card1.value > card2.value;
        } else {
            if (card2adut === adut) {
                return false;
            }
            return true;
        }
    }
    return true;
};

lib.Card.compareLepezas = function (l1, l2, adut) {
    var cards1 = lib.Card.ppn2cards(l1);
    var cards2 = lib.Card.ppn2cards(l2);
    var l1wins = 0;
    var l2wins = 0;
    _.each(cards1, function (c1) {
        _.each(cards2, function (c2) {
            if (lib.Card.beats(c1, c2, adut)) {
                l1wins++;
            } else {
                l2wins++;
            }
            if (l1wins > 0 && l2wins > 0) {
                return false;
            }
        });
        if (l1wins > 0 && l2wins > 0) {
            return false;
        }
    });
    return (0 === l2wins) ? 1 : (0 === l1wins) ? 2 : 0;
};

lib.Card.getTrickCard = function (trick, username) {
    if (trick.firstUser && trick.firstUser === username) {
        return trick.first;
    } else if (trick.secondUser && trick.secondUser === username) {
        return trick.second;
    } else if (trick.thirdUser && trick.thirdUser === username) {
        return trick.third;
    }
    return null;
};

lib.Card.isThrowable = function (ppnCard, stage, trick, adut, hasAdut, trickAdut, hasTrickAdut) {
    if ("X" === ppnCard) {
        return false;
    }

    if (lib.Stage.isExchanging(stage)) {
        return true;
    }

    if (lib.Stage.isPlaying(stage)) {

        if (trick && trick.first) {
            var card = lib.Card.ppn2card(ppnCard);
            var cardAdut = lib.Adut.cardAdut(card);

            if (cardAdut === trickAdut) {
                return true;

            } else {

                if (true === hasTrickAdut) {
                    return false;

                } else if (cardAdut === adut) {
                    return true;

                } else if (adut === lib.Adut.NO_ADUT) {
                    return true;

                } else if (true === hasAdut) {
                    return false;

                }
                return true;
            }

        } else {
            return true;
        }
    }

    return false;
};

lib.Card.ppn2cards = function (ppnCards) {
    if (typeof ppnCards === "string") {
        ppnCards = ppnCards.split("");
    }
    return _.map(ppnCards, function (ppn) {
        return lib.Card.ppn2card(ppn);
    });
};

lib.Card.suit = function (cards, suit) {
    var ret = [];
    _.each(cards, function (n) {
        n && n.suit === suit && ret.push(n);
    });
    return ret;
};

lib.Card.ppn2card = function (ppn) {
    return lib.Card.card(lib.Card.ppn2cardID(ppn));
};

lib.Card.cards2ppns = function (cards) {
    var ret = [];
    _.each(cards, function (n) {
        n && ret.push(n.ppn);
    });
    return ret;
};

lib.Card.cards2labels = function (cards) {
    var ret = [];
    _.each(cards, function (n) {
        n && ret.push(n.label);
    });
    return ret;
};

lib.Card.infoTalonDisplay = function (talon) {
    if (talon && talon.length === 2) {
        var cards = talon.split("");
        return lib.Card.infoCardDisplay(cards[0]) + '&nbsp;&nbsp;' + lib.Card.infoCardDisplay(cards[1]);
    }
    return "";
};

lib.Card.infoCardDisplay = function (ppn) {
    if (ppn) {
        var card = lib.Card.ppn2card(ppn);
        if (card) {
            return '<b style="color: ' + card.color + ';">'
                + '<img src="/img/table/info/' + card.image + '" />'
                + (card.valueLabel === "X" ? "10" : card.valueLabel)
                + '</b>';
        }
    }
    return '';
};

lib.Card.card = function (cardID) {
    var card = {
        id: cardID,
        ppn: lib.Card.ppn(cardID)
    };

    if (cardID <= 8) {
        card.suit = "PIK";
        card.suitLabel = "P";
        card.color = "black";
        card.image = "p.gif";
    } else if (cardID <= 16) {
        card.suit = "KARO";
        card.suitLabel = "K";
        card.color = "red";
        card.image = "k.gif";
    } else if (cardID <= 24) {
        card.suit = "HERC";
        card.suitLabel = "H";
        card.color = "red";
        card.image = "h.gif";
    } else if (cardID <= 32) {
        card.suit = "TREF";
        card.suitLabel = "T";
        card.color = "black";
        card.image = "t.gif";
    }
    cardID = (cardID - 1) % 8 + 7;
    card.value = cardID < 11 ? cardID : cardID + 1;

    if (7 === card.value) {
        card.valueLabel = "7";
        card.label = card.suitLabel + "7";
    } else if (8 === card.value) {
        card.valueLabel = "8";
        card.label = card.suitLabel + "8";
    } else if (9 === card.value) {
        card.valueLabel = "9";
        card.label = card.suitLabel + "9";
    } else if (10 === card.value) {
        card.valueLabel = "X";
        card.label = card.suitLabel + "X";
    } else if (12 === card.value) {
        card.valueLabel = "J";
        card.label = card.suitLabel + "J";
    } else if (13 === card.value) {
        card.valueLabel = "Q";
        card.label = card.suitLabel + "Q";
    } else if (14 === card.value) {
        card.valueLabel = "K";
        card.label = card.suitLabel + "K";
    } else if (15 === card.value) {
        card.valueLabel = "A";
        card.label = card.suitLabel + "A";
    }

    return card;
};

lib.Card.ppn2cardID = function (ppn) {
    if ("1" === ppn) return 1;
    if ("2" === ppn) return 2;
    if ("3" === ppn) return 3;
    if ("4" === ppn) return 4;
    if ("5" === ppn) return 5;
    if ("6" === ppn) return 6;
    if ("7" === ppn) return 7;
    if ("8" === ppn) return 8;

    if ("9" === ppn) return 9;
    if ("A" === ppn) return 10;
    if ("B" === ppn) return 11;
    if ("C" === ppn) return 12;
    if ("D" === ppn) return 13;
    if ("E" === ppn) return 14;
    if ("F" === ppn) return 15;
    if ("G" === ppn) return 16;

    if ("H" === ppn) return 17;
    if ("I" === ppn) return 18;
    if ("J" === ppn) return 19;
    if ("K" === ppn) return 20;
    if ("L" === ppn) return 21;
    if ("M" === ppn) return 22;
    if ("N" === ppn) return 23;
    if ("O" === ppn) return 24;

    if ("P" === ppn) return 25;
    if ("Q" === ppn) return 26;
    if ("R" === ppn) return 27;
    if ("S" === ppn) return 28;
    if ("T" === ppn) return 29;
    if ("U" === ppn) return 30;
    if ("V" === ppn) return 31;
    if ("W" === ppn) return 32;

    return 0;
};

lib.Card.ppn = function (c) {
    switch (c) {
        case 1:
            return "1";
        case 2:
            return "2";
        case 3:
            return "3";
        case 4:
            return "4";
        case 5:
            return "5";
        case 6:
            return "6";
        case 7:
            return "7";
        case 8:
            return "8";

        case 9:
            return "9";
        case 10:
            return "A";
        case 11:
            return "B";
        case 12:
            return "C";
        case 13:
            return "D";
        case 14:
            return "E";
        case 15:
            return "F";
        case 16:
            return "G";

        case 17:
            return "H";
        case 18:
            return "I";
        case 19:
            return "J";
        case 20:
            return "K";
        case 21:
            return "L";
        case 22:
            return "M";
        case 23:
            return "N";
        case 24:
            return "O";

        case 25:
            return "P";
        case 26:
            return "Q";
        case 27:
            return "R";
        case 28:
            return "S";
        case 29:
            return "T";
        case 30:
            return "U";
        case 31:
            return "V";
        case 32:
            return "W";
    }
    return "X";
};
