import { save } from '../actions'

export const handleSave = (dispatch, nextState, prevState) => {
  if (!nextState.workout.done) return // only save if it's done
  if (!nextState.app.user) {
    console.log('not logged in; skipping')
    return
  }
  if (nextState.workout.saved) {
    console.log('already saved; skipping')
    return
  }

  if (prevState.workout.done !== nextState.workout.done) {
    console.log('saving')
    dispatch(save())
  }
}
