import { connect } from "react-redux"
import { undo, timerRestart } from '../actions';
import NavBar from "../components/NavBar"


const mapStateToProps = state => ({
    drawIndex: state.workout.drawIndex
})

const mapDispatchToProps = dispatch => ({
    undoClick: () => dispatch(undo()),
    timerRestart: () => dispatch(timerRestart())
})

const VisibleNavBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(NavBar)

export default VisibleNavBar
