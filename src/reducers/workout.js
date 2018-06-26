import * as types from '../actions/actionTypes'
import data from '../data/exercises'
import { cloneObject } from '../utils'

const initialState = {
    drawCount: 3,
    exercises: {
        'hearts': '...',
        'diamonds': '...',
        'clubs': '...',
        'spades': '...'
    },
    deck: [],
    drawIndex: null,
    discardIndex: null,
    draw: [],
    discard: []
};

// This will come in handy when we support the UI to choose a fast workout
// const filterExercises = (data, fast) => {
//     return data.filter(ex => ex.fast == fast)
// }

const buildDeck = () => {
    var deck = [];
    ['hearts', 'diamonds', 'clubs', 'spades'].forEach(suit => {
        for (var i=2; i<=14; i++) {
            deck.push([suit, i]);
        }
    });

    deck.push(['red_joker', 0]);
    deck.push(['black_joker', 0]);

    return deck;
}

const spliceExercise = exercises => {
    return exercises.splice(Math.floor(Math.random() * exercises.length), 1)[0];
}

const generate = (state) => {
    var groups = Object.keys(data);
    var randGroup = groups[Math.floor(Math.random() * groups.length)];
    var localData = {};

    // slice(0) is a trick to get a clone of an array; we have to
    // create a "deep clone" of this object because splice() is
    // destructive (on purpose, to prevent duplicates)
    groups.forEach(group => localData[group] = data[group].slice(0));

    var newExercises = {
        'hearts':   spliceExercise(localData["upper"])["name"],
        'diamonds': spliceExercise(localData["lower"])["name"],
        'clubs':    spliceExercise(localData["core"])["name"],
        'spades':   spliceExercise(localData[randGroup])["name"]
    };

    // Reshuffle until we get a deck that doesn't begin with a joker
    do {
        var sortedDeck = buildDeck();
        var shuffledDeck = [];

        // Shuffle deck
        while (sortedDeck.length > 0) {
            shuffledDeck.push(
                sortedDeck.splice(Math.floor(Math.random() * sortedDeck.length), 1)[0]
            )
        }
    } while (   shuffledDeck[shuffledDeck.length-1][0] === 'red_joker'
             || shuffledDeck[shuffledDeck.length-1][0] === 'black_joker')

    shuffledDeck.unshift(["done", 0])

    return Object.assign({}, state, {
        exercises: newExercises,
        deck: shuffledDeck,
        draw: [],
        drawIndex: null,
        discardIndex: null,
        discard: []
    });
}

const buildCardPiles = (state) => {
    if (state["drawIndex"] !== null) {
        if (state["drawIndex"] === 0) {
            state["draw"] = state["deck"].slice(0,1)
            state["discard"] = state["deck"].slice(1)
        } else {
            state["draw"] = state["deck"].slice(state["drawIndex"],
                                                state["drawIndex"] + state["drawCount"])
            state["discard"] = state["deck"].slice(state["drawIndex"] + state["drawCount"])
        }
    } else {
        state["draw"] = []
        state["discard"] = []
    }

    return state
}

const draw = (state, drawCountPref) => {
    var newState = cloneObject(state);

    if (state["drawIndex"] === null) {
        newState["drawIndex"] = state["deck"].length - state["drawCount"]
    } else {
        newState["drawIndex"] = Math.max(state["drawIndex"] - state["drawCount"], 0)
    }

    newState = buildCardPiles(newState)
    return newState;
}

const undo = (state) => {
    var newState = cloneObject(state);

    if(state["drawIndex"] >= state["deck"].length - state["drawCount"]) {
        newState["drawIndex"] = null
    } else if(state["drawIndex"] === 0) {
        // The very end of the deck
        newState["drawIndex"] = 1
    } else {
        newState["drawIndex"] = Math.min(state["drawIndex"] + state["drawCount"],
                                         state["deck"].length - state["drawCount"])
    }

    newState = buildCardPiles(newState)
    return newState
}

const drawThree = (state) => {
    var newState = cloneObject(state)
    newState.drawCount = (newState.drawCount === 1) ? 3 : 1
    newState = buildCardPiles(newState)
    return newState;
}

export default function workout(state = initialState, action) {
    switch (action.type) {
    case types.GENERATE:
        return generate(state);

    case types.DRAW:
        return draw(state, state.drawCount);

    case types.TOGGLE_DRAW_THREE:
        return drawThree(state);

    case types.UNDO:
        return undo(state);

    default:
    return state;
    }
}
