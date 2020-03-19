import { connect } from 'react-redux'
import { timerAwareUndo, timerRestart } from '../actions';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class NavBar extends Component {
  _undo = (e) => {
    e.preventDefault()
    this.props.undoClick()
  }

  onInnerPage = (match, location) => {
    return location.pathname !== '/'
  }

  onMainPage = (match, location) => {
    return location.pathname === '/'
  }

  render() {
    var undoClass = 'material-icons'
    if (this.props.drawIndex === null || this.props.noUndo) {
      undoClass += ' unavailable'
    }

    return (
      <header className="navbar">
        <section className="navbar-section navbar-icon">
          <NavLink
            to="/"
            isActive={ this.onInnerPage }
            activeClassName="show-link"
          >
            <i className="material-icons">arrow_back</i>
          </NavLink>

          <i className={ undoClass } onClick={ this._undo }>undo</i>
        </section>
        <section className="navbar-center">
          <h1>Wednesday Project</h1>
        </section>
        <section className="navbar-section navbar-icon navbar-icon-right">
          <NavLink
            to="/help"
            className="help-link"
            isActive={ this.onMainPage }
            activeClassName="show-link">
            <i className="material-icons help-icon">help</i>
          </NavLink>

          <NavLink
            to="/settings"
            isActive={ this.onMainPage }
            activeClassName="show-link">
            <i className="material-icons">settings</i>
          </NavLink>
        </section>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  drawIndex: state.workout.drawIndex
})

const mapDispatchToProps = dispatch => ({
  undoClick: () => dispatch(timerAwareUndo()),
  timerRestart: () => dispatch(timerRestart())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar)
