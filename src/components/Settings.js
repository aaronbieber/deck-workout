import React, { Component } from 'react';
import NavBar from './NavBar'
import VisibleCards from '../containers/VisibleCards'
import VisibleSwitch from '../containers/VisibleSwitch';
import VisibleExerciseSelector from "../containers/VisibleExerciseSelector"

export default class Settings extends Component {
    _generate = (e) => {
        e.preventDefault();

        if (this.props.draw.length) {
            var confirmRestart = window.confirm("Really start over?");
            if (!confirmRestart) return;
        }

        this.props.timerStop();
        this.props.timerReset();
        this.props.randomize();
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
