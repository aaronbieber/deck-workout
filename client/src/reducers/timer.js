import * as types from '../actions/actionTypes';

const initialState = {
    start: null,
    running: false,
    time: ['00', '00', '00'],
    inc: 0
}

const pad = (n, z) => {
    var width = 2
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

const computeTime = (start, now) => {
    if (start) {
        var delta = now - start

        if (delta > 0) {
            var remainder
            var hours = 0,
                minutes = 0,
                seconds = 0

            hours = Math.floor(delta / 3600)
            remainder = delta % 3600
            if (remainder > 0) {
                minutes = Math.floor(remainder / 60)
                remainder = remainder % 60
            }
            if (remainder > 0) {
                seconds = remainder
            }

            return [
                pad(hours),
                pad(minutes),
                pad(seconds)
            ]
        }
    }
    return ['00', '00', '00']
}

const now = () => {
    return Math.floor(new Date().getTime() / 1000)
}

export default function timer(state = initialState, action) {
    switch (action.type) {

    case types.TIMER_START:
        return Object.assign({}, state, {
            start: now(),
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
            start: now(),
            running: state.running,
            inc: 0
        })

    case types.TIMER_RESTART:
        return Object.assign({}, state, {
            start: state.start,
            running: true,
            inc: state.inc
        })

    case types.TIMER_TICK:
        if (state.running === false) {
            return state
        }

        if (state.start !== now) {
            return Object.assign({}, state, {
                start: state.start,
                time: computeTime(state.start, now()),
                inc: state.inc + 1
            })
        }
        return state

    default:
        return state
    }
}
