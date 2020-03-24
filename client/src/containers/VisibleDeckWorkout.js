import { connect } from 'react-redux';
import DeckWorkout from '../components/DeckWorkout';
import { load } from '../actions';

const mapStateToProps = state => {
  return {
    exercises: state.workout.exercises,
    saved: state.workout.saved
  };
};

const mapDispatchToProps = dispatch => ({
    load: (workoutId) => dispatch(load(workoutId))
});

const VisibleDeckWorkout = connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckWorkout);

export default VisibleDeckWorkout;
