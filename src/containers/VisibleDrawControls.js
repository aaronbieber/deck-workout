import { connect } from 'react-redux';
import { generate, draw, toggleDrawThree, timerStart, timerReset, timerStop } from '../actions';
import DrawControls from '../components/DrawControls';

const mapStateToProps = state => ({
    deck: state.workout.deck,
    discard: state.workout.discard
});

const mapDispatchToProps = dispatch => ({
    generate: () => dispatch(generate()),
    draw: () => dispatch(draw()),
    toggleDrawThree: () => dispatch(toggleDrawThree()),
    timerStart: () => dispatch(timerStart()),
    timerStop: () => dispatch(timerStop()),
    timerReset: () => dispatch(timerReset())
});

const VisibleDrawControls = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawControls);

export default VisibleDrawControls;
