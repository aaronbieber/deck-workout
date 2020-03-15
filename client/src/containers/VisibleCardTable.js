import { connect } from 'react-redux';
import { draw, timerStart, timerStop } from '../actions';
import CardTable from '../components/CardTable';

const mapStateToProps = state => {
    return {
        drawCount: state.workout.drawCount,
        draw: state.workout.draw,
        drawIndex: state.workout.drawIndex,
        deck: state.workout.deck,
        discard: state.workout.discard
    };
};

const mapDispatchToProps = dispatch => ({
    drawClick: () => dispatch(draw()),
    timerStart: () => dispatch(timerStart()),
    timerStop: () => dispatch(timerStop())
});

const VisibleCardTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(CardTable);

export default VisibleCardTable;
