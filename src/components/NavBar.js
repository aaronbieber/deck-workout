import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class NavBar extends Component {
    _undo = (e) => {
        e.preventDefault()
        this.props.undoClick()
        this.props.timerRestart()
    }

    render() {
        var undoClass = "material-icons"
        if (this.props.drawIndex === null || this.props.noUndo) {
            undoClass += " unavailable"
        }

        return (
            <header className="navbar">
              <section className="navbar-section navbar-icon">
                <NavLink
                  to="/"
                  activeClassName="hide-link"
                  exact={ true }>
                  <i className="material-icons">arrow_back</i>
                </NavLink>

                <i className={ undoClass }
                   onClick={ this._undo }>undo</i>
              </section>
              <section className="navbar-center">
                <h1>Wednesday Project</h1>
              </section>
              <section className="navbar-section navbar-icon navbar-icon-right">
                <NavLink
                  to="/settings"
                  activeClassName="hide-link">
                  <i className="material-icons">settings</i>
                </NavLink>
              </section>
            </header>
        );
    }
}
