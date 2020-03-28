import * as types from '../actions/actionTypes'
import { cloneObject } from '../utils'

const initialState = {
  customizingSuit: null,
  user: false,
  error: false,
  workouts: []
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

const hydrateWorkouts = (state, workouts) => {
  var newState = cloneObject(state)
  newState["workouts"] = workouts
  return newState
}

const error = (state, message) => {
  var newState = cloneObject(state)
  newState["error"] = message
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

  case types.HYDRATE_WORKOUTS:
    return hydrateWorkouts(state, action.workouts)

  case types.ERROR:
    return error(state, action.message)

  default:
    return state;
  }
}
