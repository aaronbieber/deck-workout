import { connect } from 'react-redux';
import ProgressBar from '../components/ProgressBar';

const mapStateToProps = (state) => {
    return {
        discard: state.workout.discard
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const VisibleProgressBar = connect(
    mapStateToProps,
    mapDispatchToProps
)(ProgressBar);

export default VisibleProgressBar;
