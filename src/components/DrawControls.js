import React, { Component } from 'react';
import VisibleSwitch from '../containers/VisibleSwitch';

export default class DrawControls extends Component {

    _generate = (e) => {
        e.preventDefault();
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
        return (
            <div className="columns controls">
              <div className="column col-11 col-mx-auto">
                <form className="form-horizontal" action="#" onSubmit={ this._submit }>
                  <div className="form-group">
                    <div className="col-4 col-ml-1">
                      <button onClick={ this._generate } className="btn">Regenerate</button>
                    </div>

                    <div className="col-3 col-ml-1">
                      <button onClick={ this._draw } className="btn btn-primary">Draw</button>
                    </div>

                    <div className="col-4">
                      <VisibleSwitch name="draw3"
                                     label="Draw 3" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
        );
    }
}
