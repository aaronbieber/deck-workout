import { connect } from 'react-redux';
import WorkoutList from '../components/WorkoutList';
import { loadWorkouts, load } from '../actions';

const mapStateToProps = state => ({
  workouts: state.app.workouts
})

const mapDispatchToProps = dispatch => ({
  loadWorkouts: () => { dispatch(loadWorkouts()) },
  load: (workoutId) => { dispatch(load(workoutId)) }
})

const VisibleWorkoutList = connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkoutList)

export default VisibleWorkoutList
