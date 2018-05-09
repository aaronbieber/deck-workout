import { connect } from 'react-redux';
import { generate, draw, toggleDrawThree } from '../actions';
import DrawControls from '../components/DrawControls';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    generate: () => dispatch(generate()),
    draw: () => dispatch(draw()),
    toggleDrawThree: () => dispatch(toggleDrawThree())
});

const VisibleDrawControls = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawControls);

export default VisibleDrawControls;
