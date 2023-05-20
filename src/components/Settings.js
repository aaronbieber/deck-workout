import React, { Component } from 'react'
import NavBar from './NavBar'
import Cards from './Cards'
import Switch from './Switch'
import ExerciseSelector from './ExerciseSelector'
import { useDispatch, useSelector } from 'react-redux'
import { timerStop, timerReset, randomizeExercises } from '../actions'

const Settings = (props) => {
  const dispatch = useDispatch()
  const exercises = useSelector((state) => state.workout.exercises)
  const customizingSuit = useSelector((state) => state.app.customizingSuit)
  const drawLength = useSelector((state) => state.workout.draw.length)

  const _generate = (e) => {
    e.preventDefault();

    if (drawLength > 0) {
      var confirmRestart = window.confirm("Really start over?");
      if (!confirmRestart) return;
    }

    dispatch(timerStop())
    dispatch(timerReset())
    dispatch(randomizeExercises())
  }

  var settingsForm = (
    <div className="columns controls">
      <div className="column col-11 col-mx-auto">
        <form className="form-horizontal" action="#">

          <div className="form-group">
            <div className="col-4">
              <label className="form-label">Tempt fate</label>
            </div>
            <div className="col-8 col-ml-auto">
              <button onClick={_generate} id="btn-randomize" className="btn">Randomize</button>
            </div>
          </div>

          <div className="form-group">
            <div className="col-4">
              <label className="form-label">Draw three</label>
            </div>

            <div className="col-8">
              <Switch name="draw3" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )

  const customizeForm = (
    <ExerciseSelector suit={customizingSuit} />
  )

  var pageContent
  if (customizingSuit !== null) {
    pageContent = customizeForm
  } else {
    pageContent = settingsForm
  }

  return (
    <div>
      <NavBar noUndo={true} />
      <Cards exercises={exercises} edit={props.location.pathname === "/settings"} />

      {pageContent}
    </div>
  );
}

export default Settings