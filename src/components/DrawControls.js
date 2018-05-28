import React, { Component } from 'react';
import VisibleSwitch from '../containers/VisibleSwitch';

export default class DrawControls extends Component {

    _generate = (e) => {
        e.preventDefault();

        if (this.props.deck.length < 54) {
            var confirmRestart = window.confirm("Really start over?");
            if (!confirmRestart) return;
        }

        this.props.timerStop();
        this.props.timerReset();
        this.props.generate();
    }

    _draw = (e) => {
        e.preventDefault();
        this.props.draw();
    }

    _submit = (e) => {
        e.preventDefault();
    }

    render() {
        var remainingCards = this.props.deck.length;
        var drawButtonClass = "btn btn-primary"
        if (remainingCards < 1) {
            drawButtonClass += " disabled"
        }

        return (
            <div className="columns controls">
              <div className="column col-11 col-mx-auto">
                <form className="form-horizontal" action="#" onSubmit={ this._submit }>
                  <div className="form-group">
                    <div className="col-4">
                      <button onClick={ this._generate } className="btn">Regenerate</button>
                    </div>

                    <div className="col-4" style={{ textAlign: 'center' }}>
                      <VisibleSwitch name="draw3"
                                     label="Draw 3" />
                    </div>

                    <div className="col-4" style={{ textAlign: 'right' }}>
                      <button onClick={ this._draw } className={drawButtonClass}>Draw</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
        );
    }
}
