import * as types from '../actions/actionTypes'

const initialState = {
    customizingSuit: null
}

export default function app(state = initialState, action) {
    switch (action.type) {
    case types.CUSTOMIZE_SUIT:
        return {
            customizingSuit: action.suit
        }

    case types.CUSTOMIZE_SUIT_END:
        return {
            customizingSuit: null
        }

    default:
        return state;
    }
}
