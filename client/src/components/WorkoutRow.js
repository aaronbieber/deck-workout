import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import suitSymbols from '../data/suitSymbols'
import { pad } from '../utils'
import { timerStop, timerReset, repeatWorkout } from '../actions'
var moment = require('moment')

class WorkoutRow extends Component {
  _share = (e) => {
    e.preventDefault()
    window.open('/w/'+this.props.workout._id)
  }

  _repeat = (e) => {
    e.preventDefault()
    this.props.timerStop()
    this.props.timerReset()
    this.props.repeatWorkout(this.props.workout)
    this.props.history.push('/')
  }

  render() {
    var created = moment.utc(this.props.workout.created)
    var suits = Object.keys(suitSymbols)
    var time = pad(this.props.workout.time[1]) + ':' + pad(this.props.workout.time[2])
    return (
      <div className="workout-row">
        <div className="workout-row-head">
          <div className="workout-row-created">{ created.fromNow() }</div>
          <div className="workout-row-cell workout-row-time">{ time }</div>
        </div>

        <div className="workout-row-exercises">
          {suits.map(s => {
            return (
              <div className="workout-exercise" key={"exercise-"+s}>
                <span className={"suit-symbol suit-"+suitSymbols[s]['color']}>{suitSymbols[s]['symbol']}</span>
                <span>{this.props.workout.exercises[s]}</span>
              </div>
            )
          })}
        </div>

        <div className="workout-row-actions">
          <button onClick={this._share}><i className="material-icons">share</i> Share</button>
          <button onClick={this._repeat}><i className="material-icons">replay</i> Repeat</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  timerStop: () => { dispatch(timerStop()) },
  timerReset: () => { dispatch(timerReset()) },
  repeatWorkout: (workout) => { dispatch(repeatWorkout(workout)) }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkoutRow))
