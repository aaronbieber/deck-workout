import { connect } from 'react-redux';
import Cards from '../components/Cards';

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

const VisibleCards = connect(
    mapStateToProps,
    mapDispatchToProps
)(Cards)

export default VisibleCards
