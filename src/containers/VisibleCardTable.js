import { connect } from 'react-redux';
import { draw } from '../actions';
import CardTable from '../components/CardTable';

const mapStateToProps = state => {
    return {
        drawCount: state.workout.drawCount,
        cards: state.workout.draw
    };
};

const mapDispatchToProps = dispatch => ({
    draw: () => dispatch(draw())
});

const VisibleCardTable = connect(
    mapStateToProps,
    mapDispatchToProps
)(CardTable);

export default VisibleCardTable;
