lib = ("undefined" === typeof lib) ? {} : lib;
lib.Deck = ("undefined" === typeof lib.Deck) ? {} : lib.Deck;
lib.Deck.Sort = {
    NO: 0,
    RED: 1,
    BLACK: 2,
    SUIT_VALUE: 3
};

lib.Deck.backLepeza = function (count) {
    return new Array(count + 1).join("X").split("");
};

lib.Deck.sortLepezaPPN = function (user, ppnCards) {
    var cards = lib.Card.ppn2cards(ppnCards);
    cards = lib.Deck.sortLepeza(user, cards);
    ppnCards = lib.Card.cards2ppns(cards);
    return ppnCards;
};

lib.Deck.sortLepeza = function (user, cards) {
    var reverse = false,
        sort = lib.Deck.Sort.RED,
        suits = lib.Deck.countSuits(cards);

    if (user && user.profile && user.profile.gameOptions) {
        reverse = user.profile.gameOptions.lepezaReverse || false;
        sort = user.profile.gameOptions.lepezaSort || lib.Deck.Sort.RED;
    }

    if (sort === lib.Deck.Sort.NO) {
        return cards;
    }

    if (suits < 2) {
        if (reverse) {
            cards.sort(lib.Deck.SortReverse);
        } else {
            cards.sort(lib.Deck.SortValue);
        }
        return cards;
    }

    var pik = lib.Card.suit(cards, "PIK"),
        karo = lib.Card.suit(cards, "KARO"),
        herc = lib.Card.suit(cards, "HERC"),
        tref = lib.Card.suit(cards, "TREF");

    if (true === reverse) {
        pik.sort(lib.Deck.SortReverse);
        karo.sort(lib.Deck.SortReverse);
        herc.sort(lib.Deck.SortReverse);
        tref.sort(lib.Deck.SortReverse);
    } else {
        pik.sort(lib.Deck.SortValue);
        karo.sort(lib.Deck.SortValue);
        herc.sort(lib.Deck.SortValue);
        tref.sort(lib.Deck.SortValue);
    }

    if (sort === lib.Deck.Sort.SUIT_VALUE) {
        cards = pik.concat(karo).concat(herc).concat(tref);
        return cards;
    }

    if (2 === suits) {
        var red = karo.concat(herc);
        var black = pik.concat(tref);

        cards = sort === lib.Deck.Sort.RED ? red.concat(black) : black.concat(red);
        return cards;
    }

    if (4 === suits) {
        if (sort === lib.Deck.Sort.RED) {
            cards = karo.concat(pik).concat(herc).concat(tref);
        } else {
            cards = pik.concat(karo).concat(tref).concat(herc);
        }
        return cards;
    }

    if (pik.length === 0) {
        cards = karo.concat(tref).concat(herc);
    }
    if (karo.length === 0) {
        cards = pik.concat(herc).concat(tref);
    }
    if (herc.length === 0) {
        cards = pik.concat(karo).concat(tref);
    }
    if (tref.length === 0) {
        cards = karo.concat(pik).concat(herc);
    }
    return cards;
};

/**
 * @return {number}
 */
lib.Deck.SortValue = function (a, b) {
    return a.value - b.value;
};

/**
 * @return {number}
 */
lib.Deck.SortReverse = function (a, b) {
    return b.value - a.value;
};

lib.Deck.countSuits = function (cards) {
    var ret = [];
    _.each(cards, function (n) {
        n && ret.push(n.suit);
    });
    ret = _.uniq(ret);
    return ret.length;
};

lib.Deck.findCardByID = function (cards, c) {
    return _.findWhere(cards, {"id": c});
};

lib.Deck.findCardByPPN = function (cards, ppn) {
    return _.findWhere(cards, {"ppn": ppn});
};
