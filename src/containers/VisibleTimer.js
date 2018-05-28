import { connect } from 'react-redux'
import { timerTick } from '../actions'
import Timer from '../components/Timer'

const mapStateToProps = state => ({
    start: state.timer.start,
    running: state.timer.running,
    inc: state.timer.inc
});

const mapDispatchToProps = dispatch => ({
    tick: () => dispatch(timerTick())
});

const VisibleTimer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Timer);

export default VisibleTimer
