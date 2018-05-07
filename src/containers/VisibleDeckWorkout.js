import { connect } from 'react-redux';
import DeckWorkout from '../components/DeckWorkout';

const mapStateToProps = state => {
    return {
        exercises: state.workout.exercises
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

const VisibleDeckWorkout = connect(
    mapStateToProps,
    mapDispatchToProps
)(DeckWorkout);

export default VisibleDeckWorkout;
