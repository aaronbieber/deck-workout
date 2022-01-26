import { connect } from 'react-redux'
import { share } from '../actions';
import DoneCard from '../components/DoneCard'

const mapStateToProps = state => {
    return {
        time: state.timer.time
    };
};

const mapDispatchToProps = dispatch => ({
    shareClick: (time) => dispatch(share(time))
});

const VisibleDoneCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(DoneCard)

export default VisibleDoneCard
