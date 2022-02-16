import { connect } from 'react-redux'
import { timerStop, timerReset, randomizeExercises } from "../actions"
import Settings from '../components/Settings.js'

const mapStateToProps = state => ({
    exercises: state.workout.exercises,
    customizingSuit: state.app.customizingSuit,
    draw: state.workout.draw
});

const mapDispatchToProps = dispatch => ({
    timerStop: () => dispatch(timerStop()),
    timerReset: () => dispatch(timerReset()),
    randomize: () => dispatch(randomizeExercises())
});

const VisibleSettings = connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);

export default VisibleSettings;
