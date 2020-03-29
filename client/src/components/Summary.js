import React, { Component } from 'react';
import suitSymbols from '../data/suitSymbols'
import { connect } from "react-redux";
import { pad } from '../utils'
var moment = require('moment')

class Summary extends Component {
  render() {
    console.log('rendering summary')
    console.log(this.props.workout.from)

    if (!this.props.workout.done) {
      return ''
    } else {
      var runs = this.props.workout.stats.runs
      var jokers = this.props.workout.stats.jokers

      var attribution = null
      console.log(this.props.workout)
      console.log(this.props.user)
      if (this.props.workout.by &&
          this.props.workout.from) {
        var who = (this.props.workout.by.id != this.props.user.id) ? this.props.workout.by : {name: 'You'}
        var when = moment.utc(this.props.workout.from.created).fromNow()
        var time = pad(this.props.workout.from.time[1]) + ':' + pad(this.props.workout.from.time[2])
        console.log('this workout was a repeat of '+who.name)

        attribution = (
          <div className="summary-attribution">
            <div>{ who.name } did this workout { when } in { time }.</div>
          </div>
        )
      }

      var actions = null
      if (this.props.workout.by &&
          this.props.user &&
          this.props.workout.by.id != this.props.user.id) {
        actions = (
          <div className="summary-actions">
            <button className="button-link">Do this workout!</button>
          </div>

        )
      }

      return (
        <div className="summary-wrap">
          { attribution }
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
  user: state.app.user,
  workout: state.workout
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary)
