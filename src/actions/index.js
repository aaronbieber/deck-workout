import * as types from './actionTypes';

export const generate = () => {
    return {
        type: types.GENERATE
    };
};

export const draw = () => {
    return {
        type: types.DRAW
    };
};

export const toggleDrawThree = () => {
    return {
        type: types.TOGGLE_DRAW_THREE
    };
}
