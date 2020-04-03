import React, { Component } from 'react'
import { withRouter} from 'react-router-dom'
import suitSymbols from '../data/suitSymbols'
import { connect } from "react-redux"
import { pad } from '../utils'
import { repeatWorkout } from '../actions'
var moment = require('moment')

class Summary extends Component {
  _repeatWorkout = (e) => {
    e.preventDefault()
    this.props.repeatWorkout(this.props.workout)
    this.props.history.push('/')
  }

  atWorkoutEnd = () => {
    return (this.props.workout.deck.length > 0 &&
            this.props.workout.drawIndex !== null &&
            this.props.workout.deck[this.props.workout.drawIndex][0] === 'done')
  }

  render() {
    if (!this.atWorkoutEnd()) {
      return ''
    } else {
      console.log('rendering summary')
      console.log(this.props.workout)
      console.log(this.props.time)

      var runs = this.props.workout.stats.runs
      var jokers = this.props.workout.stats.jokers

      var attribution = null
      var from = null

      // summary cases:
      // you did this workout while not logged in
      //  - done is true
      //  - by is null
      // someone else did this workout and you haven't done it (yet?)
      //  - "from" is populated
      //  - time is zero -- maybe replace this check
      // you did this workout while logged in
      //  - app.user.id is the same as by.id


      var who = ((!this.props.user && !this.props.workout.by) ||
                 this.props.user.id == this.props.workout.by.id) ? 'You' : this.props.workout.by.name

      var when = moment.utc(this.props.workout.created).fromNow()

      var time = pad(this.props.time[1]) + ':' + pad(this.props.time[2])

      attribution = (
        <div className="summary-attribution">
          <div>{ who } did this workout { when } in { time }.</div>
        </div>
      )

      if (this.props.workout.from) {
        var fromWhen = moment.utc(this.props.workout.from.created).fromNow()
        var fromTime = pad(this.props.workout.from.time[1]) + ':' + pad(this.props.workout.from.time[2])

        from = (
          <div className="summary-from">
            <div>{ this.props.workout.from.name } did this workout { fromWhen } in { fromTime }.</div>
          </div>
        )
      }

      // if (this.props.workout.by ||
      //     this.props.workout.from) {

      //   var who = ((!this.props.user && !this.props.workout.by) ||
      //              this.props.user.id == this.props.workout.by.id) ? {name:'You'} : this.props.workout.by.name

      //   //var who = (this.props.workout.by.id !== this.props.user.id) ? this.props.workout.by : {name: 'You'}
      //   var when = moment.utc(this.props.workout.created).fromNow()
      //   var time = pad(this.props.time[1]) + ':' + pad(this.props.time[2])

      //   console.log('this workout was performed by '+who.name)
      //   console.log('but originally by '+this.props.workout.from.name)

      // }

      var actions = null
      if (this.props.workout.by) {
        actions = (
          <div className="summary-actions">
            <button className="button-link" onClick={ this._repeatWorkout }>Do this workout!</button>
          </div>

        )
      }

      return (
        <div className="summary-wrap">
          { attribution }
          { from }
          { actions }

          <h3>Longest runs</h3>

          <div>
            { Object.keys(runs).map(k => {
              return (
                <div key={k}>
                  <span className={ "suit suit-"+suitSymbols[k]["color"] }>{ suitSymbols[k]["symbol"] }</span>
                  <span>{runs[k]}</span>
                </div>
              )
            }) }
          </div>

          <h3>Jokers</h3>

          <div>Black joker, { jokers['black_joker'] }</div>
          <div>Red joker, { jokers['red_joker'] }</div>
        </div>
      )
    }
  }
}


const mapStateToProps = state => ({
  time: state.timer.time,
  user: state.app.user,
  workout: state.workout
})

const mapDispatchToProps = dispatch => ({
  repeatWorkout: () => dispatch(repeatWorkout())
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary))
