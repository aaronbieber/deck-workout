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

export const doLogin = (user) => {
  return (dispatch, getState) => {
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: user
      })
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
