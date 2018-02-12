lib = ("undefined" === typeof lib) ? {} : lib;
lib.Adut = ("undefined" === typeof lib.Adut) ? {} : lib.Adut;

lib.Adut = {
	NO_ADUT: 0,
	ADUT_PIK: 1,
	ADUT_KARO: 2,
	ADUT_HERC: 3,
	ADUT_TREF: 4
};

lib.Adut.hasAdut = function (cards, adut) {
	if (typeof cards === "string") {
		cards = cards.split("");
	}
	var found = _.find(cards, function (card) {
		return adut === lib.Adut.cardAdut(card);
	});
	return found ? true : false;
};

lib.Adut.contractAdut = function (contract) {
	switch (contract) {
		case lib.Contract.CONTRACT_PIK:
		case lib.Contract.CONTRACT_IGRA_PIK:
			return lib.Adut.ADUT_PIK;
		case lib.Contract.CONTRACT_KARO:
		case lib.Contract.CONTRACT_IGRA_KARO:
			return lib.Adut.ADUT_KARO;
		case lib.Contract.CONTRACT_HERC:
		case lib.Contract.CONTRACT_IGRA_HERC:
			return lib.Adut.ADUT_HERC;
		case lib.Contract.CONTRACT_TREF:
		case lib.Contract.CONTRACT_IGRA_TREF:
			return lib.Adut.ADUT_TREF;
	}
	return lib.Adut.NO_ADUT;
};

lib.Adut.cardAdut = function (card) {
	if (card) {
		if (!_.isObject(card)) {
			card = lib.Card.ppn2card(card);
		}
		var suitLabel = card.suitLabel.toUpperCase();
		switch (suitLabel) {
			case "P":
				return lib.Adut.ADUT_PIK;
			case "K":
				return lib.Adut.ADUT_KARO;
			case "H":
				return lib.Adut.ADUT_HERC;
			case "T":
				return lib.Adut.ADUT_TREF;
		}
		lib.throw(404, 'lib.Adut.cardAdut::The card ' + JSON.stringify(card) + ' does not have a valid suitLabel.');
	}
	lib.throw(404, 'lib.Adut.cardAdut::The card parameter is null.');
};
