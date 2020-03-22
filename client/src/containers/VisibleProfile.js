import { connect } from 'react-redux';
import Profile from '../components/Profile';

const mapStateToProps = state => {
    return {
        user: state.app.user
    };
};

const VisibleProfile = connect(
    mapStateToProps
)(Profile);

export default VisibleProfile;
