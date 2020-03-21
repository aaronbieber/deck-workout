import * as types from '../actions/actionTypes'
import { cloneObject } from '../utils'

const initialState = {
  customizingSuit: null,
  user: {}
}

const customizeSuit = (state, suit) => {
  var newState = cloneObject(state)
  newState["customizingSuit"] = suit
  return newState
}

const customizeSuitEnd = (state) => {
  var newState = cloneObject(state)
  newState["customizingSuit"] = null
  return newState
}

const setLogin = (state, user) => {
  var newState = cloneObject(state)
  newState["user"] = user
  return newState
}

export default function app(state = initialState, action) {
  switch (action.type) {
  case types.CUSTOMIZE_SUIT:
    return customizeSuit(state, action.suit)

  case types.CUSTOMIZE_SUIT_END:
    return customizeSuitEnd(state)

  case types.SET_LOGIN:
    return setLogin(state, action.user)

  default:
    return state;
  }
}
