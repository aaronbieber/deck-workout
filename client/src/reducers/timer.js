import * as types from '../actions/actionTypes';
import { cloneObject, pad } from '../utils'

const initialState = {
    start: null,
    running: false,
    time: ['00', '00', '00'],
    inc: 0
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

const hydrateTimer = (state, workout) => {
  var newState = cloneObject(state)
  newState.time = workout.time.map(t => t.toString().padStart(2, '0'))
  return newState
}

const repeatTimer = (state) => {
  var newState = cloneObject(state)
  newState.from["time"] = state.workout.time.map(t => t.toString().padStart(2, '0'))
  return newState
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

    case types.HYDRATE:
      return hydrateTimer(state, action.workout)

    // case types.REPEAT:
    //   return repeatTimer(state)

    default:
        return state
    }
}
