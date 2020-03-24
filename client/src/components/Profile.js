import React, { Component } from 'react'
import NavBar from '../components/NavBar'

export default class Profile extends Component {
  render() {
    return (
      <div>
        <NavBar noUndo={ true } />
        This is your empty profile page.
      </div>
    )
  }
}
