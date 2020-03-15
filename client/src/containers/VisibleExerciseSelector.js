import { connect } from "react-redux"
import { changeSuitExerciseAndEnd } from "../actions"
import ExerciseSelector from "../components/ExerciseSelector"

const mapStateToProps = state => ({
    exercises: state.workout.exercises
});

const mapDispatchToProps = dispatch => ({
    changeSuitExerciseAndEnd: (suit, exercise) => dispatch(changeSuitExerciseAndEnd(suit, exercise))
});

const VisibleExerciseSelector = connect(
    mapStateToProps,
    mapDispatchToProps
)(ExerciseSelector);

export default VisibleExerciseSelector
