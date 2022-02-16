import * as types from './actionTypes';

export const setSeed = (seed) => {
    return {
        type: types.SET_SEED,
        seed
    }
}

export const generate = () => {
    return {
        type: types.GENERATE
    };
}

export const draw = () => {
    return {
        type: types.DRAW
    };
}

export const share = (time) => {
    return {
        type: types.SHARE,
        time
    };
}

export const toast = () => {
    return {
        type: types.TOAST
    }
}

export const undo = () => {
    return {
        type: types.UNDO
    }
}

export const toggleDrawThree = () => {
    return {
        type: types.TOGGLE_DRAW_THREE
    };
}

export const timerStart = () => {
    return {
        type: types.TIMER_START
    }
}

export const timerStop = () => {
    return {
        type: types.TIMER_STOP
    }
}

export const timerReset = () => {
    return {
        type: types.TIMER_RESET
    }
}

export const timerRestart = () => {
    return {
        type: types.TIMER_RESTART
    }
}

export const timerTick = () => {
    return {
        type: types.TIMER_TICK
    }
}

export const customizeSuit = (suit) => {
    return {
        type: types.CUSTOMIZE_SUIT,
        suit
    }
}

export const customizeSuitEnd = () => {
    return {
        type: types.CUSTOMIZE_SUIT_END
    }
}

export const changeSuitExercise = (suit, exercise) => {
    return {
        type: types.CHANGE_SUIT_EXERCISE,
        suit,
        exercise
    }
}

export const changeSuitExerciseAndEnd = (suit, exercise) => {
    return dispatch => {
        dispatch(changeSuitExercise(suit, exercise))
        dispatch(customizeSuitEnd())
    }
}

export const timerAwareUndo = () => {
    return (dispatch, getState) => {
        dispatch(undo())

        if (getState().workout.draw.length === 0) {
            dispatch(timerStop())
        } else {
            dispatch(timerRestart())
        }
    }
}
