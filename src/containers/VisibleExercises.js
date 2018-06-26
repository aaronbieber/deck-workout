import { connect } from 'react-redux'
import Exercises from '../components/Exercises.js'

const mapStateToProps = state => ({
    exercises: state.workout.exercises
});

const mapDispatchToProps = dispatch => ({
});

const VisibleExercises = connect(
    mapStateToProps,
    mapDispatchToProps
)(Exercises);

export default VisibleExercises;
