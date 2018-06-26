import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class NavBar extends Component {
    render() {
        return (
            <header className="navbar">
              <section className="navbar-section navbar-icon">
                <NavLink
                  to="/"
                  activeClassName="hide-link"
                  exact={ true }>
                  <img src="/images/back.png"
                       alt="Back" />
                </NavLink>
              </section>
              <section className="navbar-center">
                <h1>Wednesday Project</h1>
              </section>
              <section className="navbar-section navbar-icon navbar-icon-right">
                <NavLink
                  to="/exercises"
                  activeClassName="hide-link">
                  <img src="/images/settings.png"
                       alt="Settings" />
                </NavLink>
              </section>
            </header>
        );
    }
}
