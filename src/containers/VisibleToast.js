import { connect } from 'react-redux'
import Toast from '../components/Toast'

const mapStateToProps = state => {
    return {
        toast: state.workout.toast
    }
}

const mapDispatchToProps = dispatch => ({})

const VisibleToast = connect(
    mapStateToProps,
    mapDispatchToProps
)(Toast)

export default VisibleToast
