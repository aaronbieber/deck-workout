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

export default function workout(state = initialState, action) {
    switch (action.type) {
    case types.GENERATE:
        var groups = Object.keys(data);
        var randGroup = groups[Math.floor(Math.random() * groups.length)];
        var newExercises = {
            'hearts':   data["upper"][Math.floor(Math.random() * data["upper"].length)]["name"],
            'diamonds': data["lower"][Math.floor(Math.random() * data["lower"].length)]["name"],
            'clubs':    data["core"][Math.floor(Math.random() * data["core"].length)]["name"],
            'spades':   data[randGroup][Math.floor(Math.random() * data[randGroup].length)]["name"]
        };
        return Object.assign({}, state, { exercises: newExercises });

    default:
    return state;
    }
}
