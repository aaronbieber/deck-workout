import * as types from '../actions/actionTypes'
import data from '../data/exercises'
import { cloneObject } from '../utils'
import seedrandom from 'seedrandom'
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

const getAllExercises = () => {
    var allExercises = []
    for (const group of Object.keys(data)) {
        allExercises = [...allExercises, ...data[group]["exercises"].map(e => e.name)]
    }
    return allExercises
}

const encodeExercise = (exercise) => {
    return chars.charAt(getAllExercises().indexOf(exercise))
}

const generateSeed = (exercises) => {
    var str =
        encodeExercise(exercises.hearts) +
        encodeExercise(exercises.diamonds) +
        encodeExercise(exercises.clubs) +
        encodeExercise(exercises.spades)

    for (let i = 0; i < 6; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return str
}

const updateSeedFromExercises = (state) => {
    var newState = cloneObject(state)

    newState.seed =
        encodeExercise(state.exercises.hearts) +
        encodeExercise(state.exercises.diamonds) +
        encodeExercise(state.exercises.clubs) +
        encodeExercise(state.exercises.spades) +
        state.seed.substring(4)

    return newState
}

const decodeExercise = (key) => {
    return getAllExercises()[chars.indexOf(key)]
}

const randomExercise = (group) => {
    if (group === "") {
        var allExercises = getAllExercises()
        return allExercises[Math.floor(Math.random() * allExercises.length)]
    }

    return data[group]["exercises"][Math.floor(Math.random() * data[group]["exercises"].length)]["name"]
}

const getRandomExercises = () => {
    return {
        hearts:   randomExercise("upper"),
        diamonds: randomExercise("lower"),
        clubs:    randomExercise("core"),
        spades:   randomExercise("")
    }
}

const setSeed = (state, seed) => {
    var newState = cloneObject(state)

    newState.exercises = {
        hearts:   decodeExercise(seed[0]),
        diamonds: decodeExercise(seed[1]),
        clubs:    decodeExercise(seed[2]),
        spades:   decodeExercise(seed[3])
    }
    newState.seed = seed

    seedrandom(seed.substring(4), { global: true })

    return generate(newState)
}

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

const generate = (state) => {
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

const setSuitExercise = (state, suit, exercise) => {
    var newState = cloneObject(state)
    newState.exercises[suit] = exercise
    return updateSeedFromExercises(newState)
}

const randomizeExercises = (state) => {
    var newState = cloneObject(state)
    newState.exercises = getRandomExercises()
    return updateSeedFromExercises(newState)
}

const share = (state, time) => {
    var newState = cloneObject(state)
    var shareString = "WEDNESDAY PROJECT\n" +
        "🏆 " + time + " 🏆\n\n" +
        "♥ " + state.exercises.hearts + "\n" +
        "♦ " + state.exercises.diamonds + "\n" +
        "♣ " + state.exercises.clubs + "\n" +
        "♠ " + state.exercises.spades + "\n\n" +
        "deck.aaronbieber.com/#" + state.seed

    navigator.clipboard.writeText(shareString)
    newState.toast = true
    return newState;
}

const initialExercises = getRandomExercises()
const initialState = {
    drawCount: 3,
    exercises: initialExercises,
    deck: [],
    drawIndex: null,
    discardIndex: null,
    draw: [],
    discard: [],
    toast: false,
    seed: generateSeed(initialExercises)
};

export default function workout(state = initialState, action) {
    switch (action.type) {
    case types.SET_SEED:
        return setSeed(state, action.seed)

    case types.RANDOMIZE:
        return randomizeExercises(state)

    case types.GENERATE:
        return generate(state);

    case types.DRAW:
        return draw(state, state.drawCount);

    case types.SHARE:
        return share(state, action.time);

    case types.TOGGLE_DRAW_THREE:
        return drawThree(state);

    case types.UNDO:
        return undo(state);

    case types.CHANGE_SUIT_EXERCISE:
        return setSuitExercise(state, action.suit, action.exercise);

    default:
    return state;
    }
}
