import { connect } from 'react-redux';
import { draw } from '../actions';
import CardTable from '../components/CardTable';

const mapStateToProps = state => {
    return {
        drawCount: state.workout.drawCount,
        draw: state.workout.draw,
        deck: state.workout.deck
    };
};

const mapDispatchToProps = dispatch => ({
    drawClick: () => dispatch(draw())
});

const VisibleCardTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(CardTable);

export default VisibleCardTable;
