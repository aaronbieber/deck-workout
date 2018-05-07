import * as types from '../actions/actionTypes';
import data from '../data/exercises';

const initialState = {
    exercises: {
        'hearts': 'foo',
        'diamonds': 'bar',
        'clubs': 'baz',
        'spades': 'quux'
    }
};

export default function workout(state = initialState, action) {
    switch (action.type) {
    case types.GENERATE:
        var randGroup = Object.keys(data)[Math.floor(Math.random() * 4)];
        var newExercises = {
            'hearts':   data["upper"][Math.floor(Math.random() * data["upper"].length)],
            'diamonds': data["lower"][Math.floor(Math.random() * data["lower"].length)],
            'clubs':    data["core"][Math.floor(Math.random() * data["core"].length)],
            'spades':   data[randGroup][Math.floor(Math.random() * data[randGroup].length)]
        };
        return Object.assign({}, state, { exercises: newExercises });

    default:
    return state;
    }
}
