import { connect } from 'react-redux'
import Settings from '../components/Settings.js'

const mapStateToProps = state => ({
    exercises: state.workout.exercises
});

const mapDispatchToProps = dispatch => ({
});

const VisibleSettings = connect(
    mapStateToProps,
    mapDispatchToProps
)(Settings);

export default VisibleSettings;
