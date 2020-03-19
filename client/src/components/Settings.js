import React, { Component } from 'react';
import NavBar from './NavBar'
import VisibleCards from '../containers/VisibleCards'
import VisibleSwitch from '../containers/VisibleSwitch';
import VisibleExerciseSelector from "../containers/VisibleExerciseSelector"
import { GoogleLogin } from 'react-google-login'

export default class Settings extends Component {
  _generate = (e) => {
    e.preventDefault();

    if (this.props.draw.length) {
      var confirmRestart = window.confirm("Really start over?");
      if (!confirmRestart) return;
    }

    this.props.timerStop();
    this.props.timerReset();
    this.props.generate();
  }

  componentDidMount() {
    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: {
          name: 'Aaron Bieber',
          email: 'aaron@aaronbieber.com',
          googleId: '12345'
        }
      })
    }).then(res => console.log(res))
  }

  responseGoogle = (response) => {
    console.log('heard from google');
    console.log(response);

    if(!("profileObj" in response)) {
      console.log('Response from Google was incomplete or unsuccessful')
      // TODO display something, I guess?
      // We should probably mutate the state at this point
      return
    }

    fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user: response.profileObj
      })
    });
  }

  render() {
    var settingsForm = (
      <div className="columns controls">
        <div className="column col-11 col-mx-auto">
          <form className="form-horizontal" action="#" onSubmit={ this._submit }>

            <div className="form-group">
              <div className="col-4">
                <label className="form-label">Tempt fate</label>
              </div>
              <div className="col-8 col-ml-auto">
                <button onClick={ this._generate } id="btn-randomize" className="btn">Randomize</button>
              </div>
            </div>

            <div className="form-group">
              <div className="col-4">
                <label className="form-label">Draw three</label>
              </div>

              <div className="col-8">
                <VisibleSwitch name="draw3" />
              </div>
            </div>
          </form>
        </div>
        <div className="column col-11 col-mx-auto" style={{ textAlign: 'center', padding: '10px' }}>
          <GoogleLogin
            clientId="244225836003-i7181j1lnj415hu6otglv26a6qv8tg6h.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    )

    var customizeForm = (
      <VisibleExerciseSelector suit={ this.props.customizingSuit } />
    )

    var pageContent
    if (this.props.customizingSuit !== null) {
      pageContent = customizeForm
    } else {
      pageContent = settingsForm
    }

    return (
      <div>
        <NavBar noUndo={ true } />
        <VisibleCards exercises={ this.props.exercises } edit={ this.props.location.pathname === "/settings" } />

        { pageContent }
      </div>
    );
  }
}
