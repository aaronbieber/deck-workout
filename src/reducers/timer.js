import * as types from '../actions/actionTypes';

const initialState = {
    start: null,
    running: false,
    inc: 0
}

export default function timer(state = initialState, action) {
    switch (action.type) {

    case types.TIMER_START:
        return Object.assign({}, state, {
            start: Math.floor(new Date().getTime() / 1000),
            running: true,
            inc: 0
        });

    case types.TIMER_STOP:
        return Object.assign({}, state, {
            start: state.start,
            running: false,
            inc: state.inc
        })

    case types.TIMER_RESET:
        return Object.assign({}, state, {
            start: state.start,
            inc: 0
        })

    case types.TIMER_TICK:
        if (state.running === false) {
            return state
        }

        var now = Math.floor(new Date().getTime() / 1000)
        if (state.start !== now) {
            return Object.assign({}, state, {
                start: state.start,
                inc: state.inc + 1
            })
        }
        return state

    default:
        return state
    }
}
