import { connect } from 'react-redux'
import Exercises from '../components/Exercises.js'

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

const VisibleExercises = connect(
    mapStateToProps,
    mapDispatchToProps
)(Exercises);

export default VisibleExercises;
