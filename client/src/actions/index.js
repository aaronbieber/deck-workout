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

// FOR DEBUGGING ONLY
export const drawAll = () => {
  return {
    type: 'DRAW_ALL'
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

export const error = (message) => {
  return {
    type: types.ERROR,
    message
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

export const recoverSession = () => {
  return (dispatch, getState) => {
    fetch('/session')
      .then((response) => {
        if (response.ok) {
          response.json().then(user => dispatch(setLogin(user)))
        }
      })
  }
}

const userFromGoogleUser = (googleUser) => {
  return {
    id: googleUser.googleId,
    email: googleUser.email
  }
}

export const doLogin = (user) => {
  return (dispatch, getState) => {
    console.log('sending login data')
    console.log(userFromGoogleUser(user))
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userFromGoogleUser(user))
    }).then((response) => {
      if (response.ok) {
        dispatch(setLogin(user))
      } else {
        dispatch(error('Failed'))
      }
    })
  }
}

export const setLogin = (user) => {
  return {
    type: types.SET_LOGIN,
    user
  }
}

const saveableWorkout = (state) => {
  return {
    deck: state.workout.deck,
    exercises: state.workout.exercises,
    time: state.timer.time,
    from: state.workout.from
  }
}

export const save = () => {
  return (dispatch, getState) => {
    console.log('dispatching save')
    console.log(saveableWorkout(getState()))

    fetch('/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saveableWorkout(getState()))
    }).then(response => {
      if (response.ok) {
        console.log('save returned ok')
        response.json().then(workout => {
          console.log(workout)
          dispatch(saved(workout._id.toString()))
        })
      }
    })
  }
}

export const saved = (id) => {
  return {
    type: types.SAVED,
    id
  }
}

export const load = (id) => {
  console.log('i will load now')
  return (dispatch, getState) => {
    fetch('/load/'+id)
      .then(response => {
        if (response.ok) {
          console.log('load returned ok')
          response.json().then(workout => {
            console.log(workout)
            dispatch(hydrate(workout))
          })
        }
      })
  }
}

export const loadWorkouts = () => {
  return dispatch => {
    fetch('/workouts')
      .then(response => {
        if (response.ok) {
          console.log('loaded workouts')
          response.json().then(workouts => {
            console.log(workouts)
            dispatch(hydrateWorkouts(workouts))
          })
        }
      })
  }
}

export const hydrate = (workout) => {
  return {
    type: types.HYDRATE,
    workout
  }
}

export const hydrateWorkouts = (workouts) => {
  return {
    type: types.HYDRATE_WORKOUTS,
    workouts
  }
}

export const repeatWorkout = () => {
  return (dispatch, getState) => {
    var state = getState()
    dispatch({ type: types.REPEAT, timer: state.timer })
  }
}
