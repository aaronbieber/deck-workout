import { connect } from 'react-redux';
import Switch from '../components/Switch';

const mapStateToProps = state => {
    return {

    };
}

const mapDispatchToProps = dispatch => {
    return {
        toggleChecked: dispatch(toggleDrawThree())
    };
}

const VisibleSwitch = connect(
    mapStateToProps,
    mapDispatchToProps
)(Switch);

export default VisibleSwitch;
