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
    return exercises.splice(Math.floor(Math.random() * exercises.length))[0];
}

export default function workout(state = initialState, action) {
    switch (action.type) {
    case types.GENERATE:
        var groups = Object.keys(data);
        var randGroup = groups[Math.floor(Math.random() * groups.length)];
        var upper = data["upper"];

        var newExercises = {
            'hearts':   spliceExercise(data["upper"])["name"],
            'diamonds': spliceExercise(data["lower"])["name"],
            'clubs':    spliceExercise(data["core"])["name"],
            'spades':   spliceExercise(data[randGroup])["name"]
        };
        return Object.assign({}, state, { exercises: newExercises });

    default:
    return state;
    }
}
