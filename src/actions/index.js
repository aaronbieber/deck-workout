import * as types from './actionTypes';

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
