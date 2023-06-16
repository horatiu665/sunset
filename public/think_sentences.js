// define the thinkgame sentences. they can be queried from the server to update the data, but by default there should be a bunch here.

var curThinkSentenceIndex = 0;

var scramble = true;

var thinkings = {
    initial: { "prio": 0, "noprefix": true, "thinkabout": "Press the button to think about life.", "history": "You thought about life.", "author": "Horațiu" },
    now: [
        { "prio": 1, "thinkabout": "this moment.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "the sunshine.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "why you are here.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "today.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "now.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "your breathing.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "existing.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "being here.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "being yourself.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "your surroundings.", "author": "Horațiu" },
    ],
    love: [
        { "prio": 1, "thinkabout": "someone you love.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "being in love.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "falling in love.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "all the different forms of love.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "friendship.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "family.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "a friendly stranger.", "author": "Horațiu" },
        { "prio": 1, "thinkabout": "meeting a new friend.", "author": "Horațiu" },

    ],
    not: [
        { "prio": 5, "thinkabout": "the worst game you ever played.", "author": "Grzegorz" },
        { "prio": 5, "thinkabout": "this game.", "author": "Horațiu" },
    ],
    life: [
        { "prio": 1, "thinkabout": "a precious childhood memory.", "author": "Lenja feat. Horațiu" },
    ],
    universe: [
        { "prio": 1, "thinkabout": "how space is expanding but is also boundless.", "author": "Marlene" },
        { "prio": 20, "thinkabout": "a super-black hole.", "author": "Horațiu feat. Friedemann" },
    ]

}

// format: "Think about ..."
var thinkSentences = [
    { "prio": 0, "noprefix": true, "thinkabout": "Press the button to think about life.", "history": "You thought about life.", "author": "Horațiu" },
    { "prio": 1, "thinkabout": "this moment.", "author": "Horațiu" },
    { "prio": 1, "thinkabout": "someone you love.", "author": "Horațiu" },
    { "prio": 1, "thinkabout": "the bugs.", "author": "Friedemann" },
    { "prio": 1, "thinkabout": "how space is expanding but is also boundless.", "author": "Marlene" },
    { "prio": 1, "thinkabout": "the sunshine.", "author": "Horațiu" },
    { "prio": 1, "thinkabout": "a precious childhood memory.", "author": "Lenja feat. Horațiu" },
    { "prio": 1, "thinkabout": "the last time you were truly happy.", "author": "Github CoPilot" },
    { "prio": 3, "thinkabout": "your grandparents.", "author": "Friedemann" },
    { "prio": 3, "thinkabout": "your feet.", "author": "Friedemann" },
    { "prio": 3, "thinkabout": "a funny cat.", "author": "Horațiu" },
    { "prio": 3, "thinkabout": "Horațiu.", "author": "Friedemann" },
    { "prio": 3, "thinkabout": "the last time you felt truly alive.", "author": "Github CoPilot" },
    { "prio": 3, "thinkabout": "a really good laughter.", "author": "Marlene" },
    { "prio": 3, "thinkabout": "the last time you felt betrayed.", "author": "Lenja" },
    { "prio": 3, "thinkabout": "your favorite meal.", "author": "Friedemann" },
    { "prio": 3, "thinkabout": "Friedemann.", "author": "Horațiu" },
    
    { "prio": 5, "thinkabout": "the worst game you ever played.", "author": "Grzegorz" },
    { "prio": 5, "thinkabout": "this game.", "author": "Horațiu" },
    
    { "prio": 20, "thinkabout": "being on a boat.", "author": "Friedemann" },
    { "prio": 20, "thinkabout": "how fast your fingernails are growing.", "author": "Marlene" },
    { "prio": 20, "thinkabout": "lemons.", "author": "Friedemann" },
    { "prio": 20, "thinkabout": "a great book.", "author": "Friedemann" },
    { "prio": 20, "thinkabout": "jazz.", "author": "Horațiu" },
    { "prio": 20, "thinkabout": "a super-black hole.", "author": "Horațiu feat. Friedemann" },
    { "prio": 20, "thinkabout": "crocs.", "author": "Friedemann" },
    { "prio": 20, "thinkabout": "a time your parents disappointed you.", "author": "Lenja" },
    { "prio": 20, "thinkabout": "a lost memory.", "author": "Horațiu" },
    { "prio": 20, "thinkabout": "how hard it is to make videogames.", "author": "Friedemann" },
    { "prio": 20, "thinkabout": "a joke you can tell by heart.", "author": "Friedemann" },
    { "prio": 20, "thinkabout": "dust.", "author": "Friedemann" },
    { "prio": 20, "thinkabout": "nothing at all.", "author": "Horațiu" },
    { "prio": 20, "thinkabout": "thinking.", "author": "Horațiu" },
    { "prio": 20, "thinkabout": "not thinking.", "author": "Grzegorz" },
    { "prio": 20, "thinkabout": "how you are perfectly valid.", "author": "Marlene feat. Horațiu" },
    { "prio": 20, "thinkabout": "the improbability of life.", "author": "Lenja" },
    { "prio": 20, "thinkabout": "Unity Technologies Ltd.", "author": "Friedemann" },
    { "prio": 20, "thinkabout": "your favorite place to watch the sunset.", "author": "Friedemann" },
    { "prio": 20, "thinkabout": "somewhere you've never been to.", "author": "Grzegorz" },
    { "prio": 20, "thinkabout": "a conversation you had today.", "author": "Horațiu feat. Friedemann" },
    { "prio": 20, "thinkabout": "colors.", "author": "Marlene" },
    { "prio": 20, "thinkabout": "your childhood best friend.", "author": "Viktor Andersson" },
    { "prio": 20, "thinkabout": "a pasture where animals are grazing.", "author": "Tobias" },
    { "prio": 20, "thinkabout": "how a small seed can give birth to a mighty tree. Unless it's a carrot seed, then it can give birth to a mighty carrot.", "author": "Tobias feat. Horațiu" },
    { "prio": 20, "thinkabout": "how a small event can change the course of your life.", "author": "Tobias" },
    { "prio": 20, "thinkabout": "the last time you did a game jam in a medieval castle.", "author": "Ernie" },

];

// same format as thinkSentences. a list of all the ones we thought so far.
var youWereThinking = [];

function GetNumThoughts() {
    return youWereThinking.length;
}

if (scramble) {
    thinkSentences = shuffle_prio_thoughts(thinkSentences);

    console.log(thinkSentences);
}

function shuffle_prio_thoughts(array) {
    var newArray = [];

    var minPrioForScramble = 6;
    var latestPrio = 0;
    var latestIndex = 0;
    for (let i = 0; i < thinkSentences.length; i++) {
        var t = thinkSentences[i];
        var p = t["prio"];

        if (p > minPrioForScramble) {
            if (p > latestPrio) {
                latestPrio = p;
                latestIndex = i;
            }

            // insert the element in the new array between position latestIndex and the last element.
            var randomIndex = Math.floor(Math.random() * (newArray.length - latestIndex)) + latestIndex;
            newArray.splice(randomIndex, 0, t);
        }
        else {
            newArray.push(t);
        }

    }
    return newArray;
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}


//console.log(thinkSentences);