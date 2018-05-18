import * as types from '../actions/actionTypes';
import data from '../data/exercises';

const initialState = {
    drawCount: 3,
    exercises: {
        'hearts': '...',
        'diamonds': '...',
        'clubs': '...',
        'spades': '...'
    },
    deck: [],
    draw: []
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

    return deck;
}

const spliceExercise = exercises => {
    return exercises.splice(Math.floor(Math.random() * exercises.length), 1)[0];
}

const cloneState = (state) => {
    return JSON.parse(JSON.stringify(state));
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

    console.log('generate: draw count: ' + state.drawCount);
    return Object.assign({}, state, {
        exercises: newExercises,
        deck: buildDeck(),
        draw: []
    });
}

const draw = (state, drawCountPref) => {
    var newState = cloneState(state);
    var drawCount = Math.min(newState["deck"].length, state.drawCount);

    console.log(newState);

    for (var i=0; i<drawCount; i++) {
        newState["draw"].push(
            newState["deck"].splice(Math.floor(Math.random() * newState["deck"].length), 1)
        );
    }
    console.log(newState);
    return newState;
}

const drawThree = (state) => {
    console.log('toggle draw three');
    console.log('draw count: ' + state.drawCount);
    var drawCount;

    if (state.drawCount === 3) {
        drawCount = 1;
    } else {
        drawCount = 3;
    }

    var newState = Object.assign({}, state, {
        drawCount
    });

    console.log(newState);

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

    default:
    return state;
    }
}
