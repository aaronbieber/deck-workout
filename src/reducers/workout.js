import * as types from '../actions/actionTypes';
import data from '../data/exercises';

const initialState = {
    drawCount: 1,
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

export default function workout(state = initialState, action) {
    switch (action.type) {
    case types.GENERATE:
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
        return Object.assign({}, state, {
            exercises: newExercises,
            deck: buildDeck()
        });

    case types.DRAW:
        var newState = JSON.parse(JSON.stringify(state));
        console.log(newState);

        for (var i=0; i<state.drawCount; i++) {
            newState["draw"].push(
                newState["deck"].splice(Math.floor(Math.random() * newState["deck"].length), 1)
            );
        }
        console.log(newState);
        return newState;

    case types.TOGGLE_DRAW_THREE:
        break;

    default:
    return state;
    }
}
