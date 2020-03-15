import { connect } from 'react-redux';
import { generate, draw, undo, toggleDrawThree, timerStart, timerReset, timerRestart, timerStop } from '../actions';
import DrawControls from '../components/DrawControls';

const mapStateToProps = state => ({
    deck: state.workout.deck,
    draw: state.workout.draw,
    discard: state.workout.discard,
    drawIndex: state.workout.drawIndex
});

const mapDispatchToProps = dispatch => ({
    generate: () => dispatch(generate()),
    drawClick: () => dispatch(draw()),
    toggleDrawThree: () => dispatch(toggleDrawThree()),
    timerStart: () => dispatch(timerStart()),
    timerStop: () => dispatch(timerStop()),
    timerReset: () => dispatch(timerReset()),
    timerRestart: () => dispatch(timerRestart()),
    undoClick: () => dispatch(undo())
});

const VisibleDrawControls = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawControls);

export default VisibleDrawControls;
