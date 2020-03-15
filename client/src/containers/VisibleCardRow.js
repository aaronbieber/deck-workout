import { connect } from "react-redux";
import { customizeSuit } from "../actions"
import CardRow from "../components/CardRow"

const mapStateToProps = state => ({
    customizingSuit: state.app.customizingSuit
})

const mapDispatchToProps = dispatch => ({
    editClick: (suit) => { dispatch(customizeSuit(suit)) }
})

const VisibleCardRow = connect(
    mapStateToProps,
    mapDispatchToProps
)(CardRow)

export default VisibleCardRow
