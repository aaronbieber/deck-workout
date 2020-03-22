import { connect } from "react-redux";
import Summary from '../components/Summary';

const mapStateToProps = state => ({
  done: state.workout.done,
  stats: state.workout.stats
})

const mapDispatchToProps = dispatch => ({
})

const VisibleSummary = connect(
  mapStateToProps,
  mapDispatchToProps
)(Summary)

export default VisibleSummary
