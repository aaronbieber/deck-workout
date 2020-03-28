import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadWorkouts, load } from '../actions';
import WorkoutRow from './WorkoutRow'

class WorkoutList extends Component {
  componentDidMount = () => {
    this.props.loadWorkouts()
  }

  _load = (e) => {
    e.preventDefault()
  }

  render() {
    console.log(this.props.workouts)
    return (
      <div>
        <h3>Workout List</h3>
        {this.props.workouts.map(w => {
          return (<WorkoutRow key={w._id} workout={w} />)
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  workouts: state.app.workouts
})

const mapDispatchToProps = dispatch => ({
  loadWorkouts: () => { dispatch(loadWorkouts()) },
  load: (workoutId) => { dispatch(load(workoutId)) }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkoutList)
