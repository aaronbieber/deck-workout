import { connect } from 'react-redux'
import { doLogin, error } from '../actions'
import Profile from '../components/Profile'

const mapStateToProps = state => {
  return {
    user: state.app.user,
    errorMessage: state.app.error
  };
};

const mapDispatchToProps = dispatch => ({
  doLogin: (user) => dispatch(doLogin(user)),
  error: (message) => dispatch(error(message))
})

const VisibleProfile = connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);

export default VisibleProfile;
