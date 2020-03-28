import React, { Component } from 'react';
import { connect } from 'react-redux';
import suitSymbols from '../data/suitSymbols'
import { pad } from '../utils'
var moment = require('moment')

export default class WorkoutRow extends Component {
  render() {
    var created = moment.utc(this.props.workout.created)
    var suits = Object.keys(suitSymbols)
    var time = pad(this.props.workout.time[0]) + ':' +
        pad(this.props.workout.time[1]) + ':' +
        pad(this.props.workout.time[2])
    return (
      <div className="workout-row">
        <div className="workout-cell workout-cell-expand">
          <div className="workout-row-created">{ created.fromNow() }</div>
          <div className="workout-row-exercises">
            {suits.map(s => {
              return (
                <div key={"exercise-"+s}>
                  <span className={"suit-"+suitSymbols[s]['color']}>{suitSymbols[s]['symbol']}</span>
                  <span>{this.props.workout.exercises[s]}</span>
                </div>
              )
            })}
          </div>
        </div>
        <div className="workout-row-cell workout-row-time">{ time }</div>
      </div>
    )
  }
}
