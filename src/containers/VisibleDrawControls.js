import { connect } from 'react-redux';
import { generate } from '../actions'
import DrawControls from '../components/DrawControls';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    generate: () => dispatch(generate())
});

const VisibleDrawControls = connect(
    mapStateToProps,
    mapDispatchToProps
)(DrawControls);

export default VisibleDrawControls;
