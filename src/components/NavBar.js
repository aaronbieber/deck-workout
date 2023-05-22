import { useDispatch, useSelector } from 'react-redux'
import { undo } from '../reducers/workout'
import { NavLink } from 'react-router-dom'

const NavBar = (props) => {
  const dispatch = useDispatch()
  const drawIndex = useSelector((state) => state.workout.drawIndex)
  const onInnerPage = () => {
    return props.home !== true
  }

  const onMainPage = () => {
    return props.home === true
  }

  var undoClass = 'material-icons'
  if (drawIndex === null || props.noUndo) {
    undoClass += ' unavailable'
  }

  return (
    <header className="navbar">
      <section className="navbar-section navbar-icon">
        <NavLink
          className={() => !props.home ? "show-link" : ""}
          to="/">
          <i className="material-icons">arrow_back</i>
        </NavLink>
        <i className={undoClass} onClick={() => dispatch(undo())}>undo</i>
      </section>
      <section className="navbar-center">
        <h1>Wednesday Project</h1>
      </section>
      <section className="navbar-section navbar-icon navbar-icon-right">
        <NavLink
          to="/help"
          className={() => "help-link" + (props.home ? " show-link" : "")}>
          <i className="material-icons help-icon">help</i>
        </NavLink>

        <NavLink
          to="/settings"
          className={() => props.home ? "show-link" : ""}>
          <i className="material-icons">settings</i>
        </NavLink>
      </section>
    </header>
  )
}

export default NavBar