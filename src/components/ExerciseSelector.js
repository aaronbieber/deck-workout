import React, { Component } from "react"
import data from '../data/exercises'
import { useDispatch, useSelector } from "react-redux"
import { changeSuitExerciseAndEnd } from "../actions"

const ExerciseSelector = (props) => {
  const dispatch = useDispatch()
  const exercises = useSelector((state) => state.workout.exercises)

  const _fieldChanged = (e) => {
    dispatch(changeSuitExerciseAndEnd(props.suit, e.target.value))
  }

  const makeKey = (...keys) => {
    return keys.join("-").replace(/[^a-zA-Z-]/, "").toLowerCase()
  }

  const helpLink = (exerciseData) => {
    if (exerciseData.hasOwnProperty("url")) {
      return (
        <a href={exerciseData.url} target="_blank">
          <span className="exrx material-icons">help_outline</span>
        </a>
      )
    }

    return ("")
  }

  var selectedExercise = exercises[props.suit]

  return (
    <div id="exercise-selector">
      <div className="columns">
        <div className="column col-11 col-mx-auto">
          <form action="#">
            {Object.keys(data).map(group => {
              return (
                <div
                  key={makeKey("wrap", group)}
                  className="form-group">
                  <label className="form-label">{data[group].name}</label>
                  {data[group].exercises.map(e => (
                    <div key={makeKey("help-wrap", group, e.name)}>
                      <label
                        key={makeKey("ex", group, e.name)}
                        className="form-radio">
                        <input
                          checked={selectedExercise === e.name}
                          value={e.name}
                          onChange={_fieldChanged}
                          type="radio"
                          name={"select-" + props.suit} />
                        <i className="form-icon"></i> {e.name}
                      </label>
                      {helpLink(e)}
                    </div>
                  ))}
                </div>
              )
            })}
          </form>
        </div>
      </div>
    </div>
  )
}

export default ExerciseSelector