import { connect } from 'react-redux';
import { toggleDrawThree } from '../actions';
import Switch from '../components/Switch';

const mapStateToProps = state => {
    return {
        drawCount: state.workout.drawCount
    };
}

const mapDispatchToProps = dispatch => {
    return {
        toggleChecked: function() { dispatch(toggleDrawThree()); }
    };
}

const VisibleSwitch = connect(
    mapStateToProps,
    mapDispatchToProps
)(Switch);

export default VisibleSwitch;
