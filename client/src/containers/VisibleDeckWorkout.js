import { connect } from 'react-redux';
import DeckWorkout from '../components/DeckWorkout';

const mapStateToProps = state => {
    return {
        exercises: state.workout.exercises
    };
};

const VisibleDeckWorkout = connect(
    mapStateToProps
)(DeckWorkout);

export default VisibleDeckWorkout;
