var vowels = require('../data/vowels');
var consonants = require('../data/consonants.json');
var endings = require('../data/endings.json');

// vowel characters
const ALL_VOWELS = [...new Set(Object.values(Object.values(vowels).flat()))];
const VOWELS_SOFT = vowels.soft;
const VOWELS_SOLID = vowels.solid;
const VOWELS_BOTH = vowels.both;

// consonant characters
const ALL_CONSONTANTS = [...new Set(Object.values(Object.values(consonants).flat()))];
const CONSONANTS_UNVOICED = consonants.unvoiced;
const CONSONANTS_VOICED = consonants.voiced;
const CONSONANTS_SONOR = consonants.sonor;

/**
 * @param {Object} object
 * @param {string} char
 */
function getKeyByValue(object, char) {
    return Object.keys(object).find(key => {
        return object[key].indexOf(char) > -1;
    });
}

/**
 * @param {string} str
 * @param {Array} array
 */
function getLastIndex(str, array) {
    var positionIndex = -1;
    for (var char of str.split("").reverse()) {
        if (array.includes(char)) {
            return str.lastIndexOf(char);
        }
    }

    return positionIndex;
}

function getVowelType(str) {
    var indexVowel = getLastIndex(str, ALL_VOWELS);

    if (indexVowel > -1) {
        var type = getKeyByValue(vowels, str.charAt(indexVowel));
        if (VOWELS_BOTH.includes(str.charAt(indexVowel))) {
            var nextIndexVowel = getLastIndex(str.substring(0, indexVowel), ALL_VOWELS);
            if (indexVowel !== nextIndexVowel && nextIndexVowel > -1) {
                indexVowel = nextIndexVowel
                type = getKeyByValue(vowels, str.charAt(indexVowel));
            }
        }

        return type;
    } else {
        return '';
    }
}

/**
 * @param {string} str The noun/name/string
 */
function pluralize(str) {
    var ending = '';
    var newStr = str;
    str = str.toLowerCase();
    var indexVowel = getLastIndex(str, ALL_VOWELS);

    if (type) {
        ending = endings.plural[type][0];
    } else {
        return newStr;
    }

    var lastChar = str[str.length - 1];
    if (ALL_CONSONTANTS.includes(lastChar)) {
        var tLar = [...CONSONANTS_UNVOICED, ...CONSONANTS_VOICED].filter( ( el ) => !['ж', 'з'].includes( el ));
        var dLar = [...['ж', 'з'], ...CONSONANTS_SONOR].filter( ( el ) => !['р', 'у', 'й'].includes( el ));
        if (tLar.includes(lastChar)) {
            ending = endings.plural[type][2];
        } else if (dLar.includes(lastChar)) {
            ending = endings.plural[type][1];
        }
    }

    return newStr + ending;
}


/**
 * @param {string} str The noun/name/string
 * @param {number} side The side: my/our - 1, your/yours - 2, others - 3
 * @param {boolean} formal The number: formal - true, unformal - false (only when side is 2)
 */
function belong(str, side = 1, formal = false) {
    var ending = '';
    var newStr = str;
    str = str.toLowerCase();

    var convertChars = [{
            'voiced': 'п',
            'unvoiced': 'б',
        }, {
            'voiced': 'ф',
            'unvoiced': 'в',
        }, {
            'voiced': 'к',
            'unvoiced': 'г',
        }, {
            'voiced': 'қ',
            'unvoiced': 'ғ',
        }];

    var lastChar = str[str.length - 1];
    var convertedCharIndex = convertChars.map(item => item['voiced']).indexOf(lastChar)
    if (convertedCharIndex > -1) {
        lastChar = convertChars[convertedCharIndex]['unvoiced']
        str = str.replace(/.$/, lastChar);
        newStr = newStr.replace(/.$/, lastChar);
    }

    var type = getVowelType(str);

    if (type) {
        ending = endings.belongs.vowels[type];
    } else {
        return newStr;
    }

    if (ALL_CONSONTANTS.includes(lastChar) || VOWELS_BOTH.includes(lastChar)) {
        ending = endings.belongs.consonants[type];
    }

    if (side > 3 || side < 1) {
        side = 1;
    }

    ending = (typeof ending[side - 1]) == 'object' ? ending[side - 1][formal ? 1 : 0] : ending[side - 1]

    return newStr + ending;
}

/**
 * @param {string} str The noun/name/string
 * @param {number} side The side: my/our - 1, your/yours - 2, others - 3
 * @param {boolean} formal The number: formal - true, unformal - false (only when side is 2)
 * @param {number} number The number: singular - 1, plural - 2
 */
function personalize(str, side = 1, formal = false, number = 1) {
    var ending = '';
    var newStr = str;
    str = str.toLowerCase();

    if (number > 2) {
        number = 2;
    }

    if (type) {
        ending = endings.personal[number === 1 ? 'singular' : 'plural'][type];
    } else {
        return newStr;
    }

    ending = ending[side - 1];

    if (side === 2) {
        ending = ending[formal ? 1 : 0];
    } else if (side === 3) {} else {
        var lastChar = str[str.length - 1];
        if (ALL_CONSONTANTS.includes(lastChar)) {
            var pIn = [...CONSONANTS_UNVOICED, ...CONSONANTS_VOICED].filter((el) => !['д', 'ж', 'з'].includes(el));
            var bIn = ['д', 'ж', 'з', 'ң'];

            if (pIn.includes(lastChar)) {
                ending = ending[1];
            } else if (bIn.includes(lastChar)) {
                ending = ending[2];
            } else {
                ending = ending[0]
            }
        } else {
            ending = ending[0]
        }
    }

    return newStr + ending;
}

function declineNominative(str, ending) {
    return str;
}

function declineGenitive(str, ending) {
    var newStr = str;
    str = str.toLowerCase();
    var lastChar = str[str.length - 1];
    if (ALL_CONSONTANTS.includes(lastChar) || VOWELS_BOTH.includes(lastChar)) {
        var tIn = [...CONSONANTS_UNVOICED, ...CONSONANTS_VOICED].filter((el) => !['ж', 'з'].includes(el));
        var dIn = ['и', 'ж', 'з', 'р', 'л', 'й', 'у'];

        if (tIn.includes(lastChar)) {
            ending = ending[2];
        } else if (dIn.includes(lastChar)) {
            ending = ending[1];
        } else {
            ending = ending[0]
        }
    }  else {
        ending = ending[0]
    }
    return newStr + ending;
}

function declineDativeDirectional(str, ending) {
    var newStr = str;
    str = str.toLowerCase();
    var lastChar = str[str.length - 1];
    if (ALL_CONSONTANTS.includes(lastChar)) {
        var kA = [...CONSONANTS_UNVOICED, ...CONSONANTS_VOICED].filter((el) => !['ж', 'з'].includes(el));

        if (kA.includes(lastChar)) {
            ending = ending[1];
        } else {
            ending = ending[0]
        }
    }  else {
        ending = ending[0]
    }
    return newStr + ending;
}

function declineAccusative(str, ending) {
    var newStr = str;
    str = str.toLowerCase();
    var lastChar = str[str.length - 1];
    if (ALL_CONSONTANTS.includes(lastChar) || VOWELS_BOTH.includes(lastChar)) {
        var tI = [...CONSONANTS_UNVOICED, ...CONSONANTS_VOICED].filter((el) => !['ж', 'з'].includes(el));
        var dI = ['и', 'ж', 'з', 'р', 'л', 'й', 'у'];

        if (tI.includes(lastChar)) {
            ending = ending[2];
        } else if (dI.includes(lastChar)) {
            ending = ending[1];
        } else {
            ending = ending[0]
        }
    }  else {
        ending = ending[0]
    }
    return newStr + ending;
}

function declineLocative(str, ending) {
    var newStr = str;
    str = str.toLowerCase();
    var lastChar = str[str.length - 1];
    if (ALL_CONSONTANTS.includes(lastChar)) {
        var dA = [...CONSONANTS_UNVOICED, ...CONSONANTS_VOICED].filter((el) => !['ж', 'з'].includes(el));

        if (dA.includes(lastChar)) {
            ending = ending[1];
        } else {
            ending = ending[0]
        }
    }  else {
        ending = ending[0]
    }
    return newStr + ending;
}

function declineAblative(str, ending) {
    var newStr = str;
    str = str.toLowerCase();
    var lastChar = str[str.length - 1];
    if (ALL_CONSONTANTS.includes(lastChar)) {
        var tAn = [...CONSONANTS_UNVOICED, ...CONSONANTS_VOICED].filter((el) => !['ж', 'з'].includes(el));
        var nAn = ['м', 'н', 'ң'];

        if (tAn.includes(lastChar)) {
            ending = ending[1];
        } else if (nAn.includes(lastChar)) {
            ending = ending[2];
        } else {
            ending = ending[0]
        }
    }  else {
        ending = ending[0]
    }
    return newStr + ending;
}

function declineInstrumental(str, ending) {
    var newStr = str;
    str = str.toLowerCase();
    var lastChar = str[str.length - 1];
    if (ALL_CONSONTANTS.includes(lastChar)) {
        var pEn = [...CONSONANTS_UNVOICED, ...CONSONANTS_VOICED].filter((el) => !['ж', 'з'].includes(el));
        var bEn = ['ж', 'з'];

        if (pEn.includes(lastChar)) {
            ending = ending[2];
        } else if (bEn.includes(lastChar)) {
            ending = ending[1];
        } else {
            ending = ending[0]
        }
    }  else {
        ending = ending[0]
    }
    return newStr + ending;
}

/**
 * @param {string} str The noun/name/string
 * @param {string|number} declension The declension: nominative - 1, genitive - 2, dative_directional, dative, directional - 3, accusative - 4, locative - 5, ablative - 6, instrumental - 7
 */

function decline(str, declension = 'nominative') {

    var ending = endings.cases;
    var type = getVowelType(str);

    if (type) {
        if (Number.isInteger(declension)) {
            ending = Object.values(ending)[declension - 1]
            if (ending && ending[type]) {
                ending = ending[type]
            }
        } else {
            ending = ending[declension][type]
        }
    } else {
        return str;
    }

    switch (declension) {
        case 1:
        case 'nominative':
            str = declineNominative(str, ending); break;
        case 2:
        case 'genitive':
            str = declineGenitive(str, ending); break;
        case 3:
        case 'dative':
        case 'directional':
        case 'dative_directional':
            str = declineDativeDirectional(str, ending); break;
        case 4:
        case 'accusative':
            str = declineAccusative(str, ending); break;
        case 5:
        case 'locative':
            str = declineLocative(str, ending); break;
        case 6:
        case 'ablative':
            str = declineAblative(str, ending); break;
        case 7:
        case 'instrumental':
            str = declineInstrumental(str, ending); break;
        default:
            throw new Error();
    }

    return str;
}

module.exports = {
    vowels: vowels,
    consonants: consonants,
    endings: endings,
    pluralize: pluralize,
    belong: belong,
    personalize: personalize,
    decline: decline
}