import * as types from '../actions/actionTypes';
import data from '../data/exercises';

const initialState = {
    exercises: {
        'hearts': '...',
        'diamonds': '...',
        'clubs': '...',
        'spades': '...'
    }
};

// This will come in handy when we support the UI to choose a fast workout
// const filterExercises = (data, fast) => {
//     return data.filter(ex => ex.fast == fast)
// }

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
        return Object.assign({}, state, { exercises: newExercises });

    default:
    return state;
    }
}
