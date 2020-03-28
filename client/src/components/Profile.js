import React, { Component } from 'react'
import NavBar from '../components/NavBar'
import { GoogleLogin } from 'react-google-login'
import WorkoutList from '../components/WorkoutList'

export default class Profile extends Component {

  responseGoogle = (response) => {
    this.props.error(JSON.stringify(response))
    if(!("profileObj" in response)) {
      console.log('Response from Google was incomplete or unsuccessful')
      this.props.error('Bad response from Google')
      return
    }

    this.props.doLogin(response.profileObj)
  }

  _logout = (e) => {
    // todo create logout action
  }

  render() {
    var loginButtonClass
    var logoutLink = ''

    if (this.props.user) {
      loginButtonClass = 'hide-login-button'
      logoutLink = (<a href="/logout" onClick={ this._logout }>Logout</a>)
    }

    return (
      <div>
        <NavBar noUndo={ true } />

        <div className="columns controls">
          <div className="column col-11 col-mx-auto login-column">
            { logoutLink }
            <GoogleLogin
              className={ loginButtonClass }
              clientId="244225836003-i7181j1lnj415hu6otglv26a6qv8tg6h.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
          </div>
          <div className="column col-11 col-mx-auto">
            <WorkoutList />
          </div>
        </div>
      </div>
    )
  }
}
