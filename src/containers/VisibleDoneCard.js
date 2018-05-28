import { connect } from 'react-redux'
import DoneCard from '../components/DoneCard'

const mapStateToProps = state => {
    return {
        time: state.timer.time
    };
};

const mapDispatchToProps = dispatch => ({
});

const VisibleDoneCard = connect(
    mapStateToProps,
    mapDispatchToProps
)(DoneCard)

export default VisibleDoneCard
