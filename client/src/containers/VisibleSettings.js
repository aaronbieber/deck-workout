import { connect } from 'react-redux'
import { timerStop, timerReset, generate } from '../actions'
import Settings from '../components/Settings.js'

const mapStateToProps = state => ({
  exercises: state.workout.exercises,
  customizingSuit: state.app.customizingSuit,
  draw: state.workout.draw,
  user: state.app.user
});

const mapDispatchToProps = dispatch => ({
  timerStop: () => dispatch(timerStop()),
  timerReset: () => dispatch(timerReset()),
  generate: () => dispatch(generate())
});

const VisibleSettings = connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings);

export default VisibleSettings;
