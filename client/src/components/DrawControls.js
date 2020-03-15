import React, { Component } from 'react';
import VisibleSwitch from '../containers/VisibleSwitch';
import debounce from 'lodash/debounce'

export default class DrawControls extends Component {

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


    _draw = debounce((e) => {
        if (this.props.deck.length > 0) {
            if (this.props.draw.length === 0) {
                this.props.timerStart()
            }

            if (this.props.deck.length === 1) {
                this.props.timerStop()
            }

            this.props.drawClick()
        }
    }, 200)

    _undo = (e) => {
        e.preventDefault()
        this.props.undoClick()
        this.props.timerRestart()
    }

    _submit = (e) => {
        e.preventDefault();
    }

    render() {
        var undoButtonClass = "btn"
        if (this.props.drawIndex === null) {
            undoButtonClass += " disabled"
        }

        // Remember to disable undo on the last card

        return (
            <div className="columns controls">
              <div className="column col-11 col-mx-auto">
                <form className="form-horizontal" action="#" onSubmit={ this._submit }>
                  <div className="form-group">
                    <div className="col-4">
                      <button onClick={ this._undo } className={ undoButtonClass }>Undo</button>
                    </div>

                    <div className="col-4" style={{ textAlign: 'center' }}>
                      <VisibleSwitch name="draw3"
                                     label="Draw 3" />
                    </div>

                    <div className="col-4" style={{ textAlign: 'right' }}>
                      <button onClick={ this._generate } className="btn">Randomize</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
        );
    }
}
